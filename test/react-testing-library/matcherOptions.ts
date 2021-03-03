import {Matcher, MatcherFunction} from "@testing-library/react";

export type MatchOptions<Match extends Matcher> =
    Match extends MatcherFunction ? BaseMatchOptions<MatcherFunction> :
    Match extends RegExp ? BaseMatchOptions<RegExp> :
    Match extends number ? BaseMatchOptions<number> :
    Match extends string ? StringMatchOptions :
    never;

interface BaseMatchOptions<Match extends Matcher> {
    wrapper?: MatchWrapper<Match>;
}
type MatchWrapper<Match extends Matcher = Matcher> = (match: Match) => Match;
interface StringMatchOptions extends BaseMatchOptions<string> {
    prefix?: string;
    postfix?: string;
}

export function applyMatchOptions<
    Match extends Matcher,
    Options extends MatchOptions<Match>,
>(match: Match, options?: Options): Match {
    if (options && Object.keys(options).length) {
        const type = typeof match;

        if (type === "string") {
            const {prefix, postfix} = options as StringMatchOptions;
            if (prefix) match = (prefix + match) as Match;
            if (postfix) match = (match + postfix) as Match;
        }

        if (options.wrapper) {
            match = (options.wrapper as MatchWrapper)(match) as Match;
        }
    }
    return match;
}
