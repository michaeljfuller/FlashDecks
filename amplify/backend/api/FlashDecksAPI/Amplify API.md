# Amplify API Guide

## Adding Custom Lambda Queries
### Add to Schema
To add a custom query, first add it to **Query** in *`./schema/root.graphql`*.

#### Example
```graphql
type Query {
    getUser(id: ID): User
}
```

### Add to CustomResources stack
* Open up *`./stacks/CustomResources.json`* and navigate to the **Resources** block.
* Merge in the following objects, replacing the following values.
  * `<NAME>` as a unique name for what we're adding (e.g. "Something").
  * `<FUNC_NAME>` as the ***global*** name of the Lambda function (e.g. "MyProject-GetSomething").
  * `<ROLE_NAME>` with the ***global*** name of the new IAM Role to add (e.g. "MyProject-GetSomething").
  * `<RESOLVER_FILENAME>` as the name of the file with the resolver (e.g. "Query.getSomething").
  * `<TYPE_NAME>` as the entity type the resolver is in (e.g. "Query", "Deck").
  * `<FIELD_NAME>` as the name of the field the resolver is on (e.g. "getSomething", "something").

#### Add DataSource
```json
{
  "Resources": {
    "<NAME>LambdaDataSource": {
      "Type": "AWS::AppSync::DataSource",
      "Properties": {
        "ApiId": { "Ref": "AppSyncApiId" },
        "Name": "<NAME>Lambda",
        "Type": "AWS_LAMBDA",
        "ServiceRoleArn": {
          "Fn::GetAtt": ["<NAME>LambdaDataSourceRole", "Arn"]
        },
        "LambdaConfig": {
          "LambdaFunctionArn": {
            "Fn::Sub": [
              "arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:<FUNC_NAME>-${env}",
              { "env": { "Ref": "env" } }
            ]
          }
        }
      }
    }
  }
}
```

### Add DataSource IAM Role
```json
{
  "Resources": {
    "<NAME>LambdaDataSourceRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": { 
          "Fn::Sub": [
            "<ROLE_NAME>LambdaDataSourceRole-${env}", 
            { "env": { "Ref": "env" } } 
          ] 
        },
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [{
            "Effect": "Allow",
            "Principal": { "Service": "appsync.amazonaws.com" },
            "Action": "sts:AssumeRole"
          }]
        },
        "Policies": [{
          "PolicyName": "InvokeLambdaFunction",
          "PolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [{
              "Effect": "Allow",
              "Action": [ "lambda:invokeFunction" ],
              "Resource": [{ 
                "Fn::Sub": [ 
                  "arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:<FUNC_NAME>-${env}", 
                  { "env": { "Ref": "env" } } 
                ] 
              }]
            }]
          }
        }]
      }
    }
  }
}
```
### Add Resolver
```json
{
  "Resources": {
    "<NAME>QueryResolver": {
      "Type": "AWS::AppSync::Resolver",
      "Properties": {
        "ApiId": { "Ref": "AppSyncApiId" },
        "DataSourceName": {
          "Fn::GetAtt": [ "<NAME>LambdaDataSource", "Name" ]
        },
        "TypeName": "<TYPE_NAME>",
        "FieldName": "<FIELD_NAME>",
        "RequestMappingTemplateS3Location": {
          "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/<RESOLVER_FILENAME>.req.vtl",
            {
              "S3DeploymentBucket": { "Ref": "S3DeploymentBucket" },
              "S3DeploymentRootKey": { "Ref": "S3DeploymentRootKey" }
            }
          ]
        },
        "ResponseMappingTemplateS3Location": {
          "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/<RESOLVER_FILENAME>.res.vtl",
            {
              "S3DeploymentBucket": { "Ref": "S3DeploymentBucket" },
              "S3DeploymentRootKey": { "Ref": "S3DeploymentRootKey" }
            }
          ]
        }
      }
    }
  }
}
```

### Create Request Resolver
Create the file `./resolvers/<RESOLVER_FILENAME>.req.vtl`.
* Replace `<FIELD_NAME>` with the name of the field to use the resolver (e.g. "getSomething").
* Replace `<TYPE_NAME>` with the name of the type that contains the resolver field (e.g. "Query").
```vtl
{
  "version": "2017-02-28",
  "operation": "Invoke",
  "payload": {
    "type": "<TYPE_NAME>",
    "field": "<FIELD_NAME>",
    "arguments": $utils.toJson($context.arguments),
    "identity": $utils.toJson($context.identity),
    "source": $utils.toJson($context.source)
  }
}
```

### Create Response Resolver
Create the file `./resolvers/<RESOLVER_FILENAME>.req.vtl`.
```vtl
$util.toJson($ctx.result)
```

### Push Changes
`amplify push api`

### Resources
* [Add a custom resolver that targets an AWS Lambda function](https://docs.amplify.aws/cli/graphql-transformer/resolvers#add-a-custom-resolver-that-targets-an-aws-lambda-function)
