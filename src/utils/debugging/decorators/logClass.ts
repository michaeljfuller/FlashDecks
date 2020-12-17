import {wrapAndLogFunction, WrapAndLogFunctionOptions} from "../wrapAndLogFunction";
import {LogGetterOptions, wrapAndLogGetter} from "../wrapAndLogGetter";
import {LogSetterOptions, wrapAndLogSetter} from "../wrapAndLogSetter";
import {GenericClass} from "../../class";

export interface LogClassOptions<T> {
    enabled?: boolean;
    methods?: Partial<Record<keyof T, WrapAndLogFunctionOptions>>|false;
    getters?: Partial<Record<keyof T, LogGetterOptions>>|false;
    setters?: Partial<Record<keyof T, LogSetterOptions>>|false;
    includeStatic?: boolean;
}

/** Class decorator to log all method calls. */
export function logClass<T>(options: LogClassOptions<T> = {}) {
    const {
        enabled = true,
        methods: methodOptions = {} as NonNullable<LogClassOptions<T>['methods']>,
        getters: getterOptions = {} as NonNullable<LogClassOptions<T>['getters']>,
        setters: setterOptions = {} as NonNullable<LogClassOptions<T>['setters']>,
        includeStatic = true,
    } = options;

    return function (targetClass: GenericClass) {
        if (!enabled) return;

        const members: ClassMember[] = extractMembers(targetClass.prototype, false);
        if (includeStatic) members.push(...extractMembers(targetClass, true));

        members.forEach(({name, descriptor, parent, scope}) => {
            const key = name as keyof T;
            let changed = false;

            if (methodOptions !== false && descriptor?.value instanceof Function) {
                descriptor.value = wrapAndLogFunction(descriptor.value, scope, name, methodOptions[key]);
                changed = true;
            }
            if (getterOptions !== false && descriptor?.get) {
                descriptor.get = wrapAndLogGetter(name, descriptor.get, getterOptions[key]);
                changed = true;
            }
            if (setterOptions !== false && descriptor?.set) {
                descriptor.set = wrapAndLogSetter(name, descriptor.set, setterOptions[key]);
                changed = true;
            }
            if (changed) {
                Object.defineProperty(parent, name, descriptor);
            }

        });

    };
}

function extractMembers(parent: object, isStatic: boolean): ClassMember[] {
    const result: ClassMember[] = [];
    const exclude = isStatic ? ['length','name','prototype'] : ['constructor'];
    const scope = isStatic ? parent : undefined;

    // Get members
    Object.getOwnPropertyNames(parent).filter(
        name => exclude.indexOf(name) < 0
    ).forEach(name => {
        const descriptor = Object.getOwnPropertyDescriptor(parent, name);
        if (descriptor) result.push({ name, descriptor, parent, scope });
    });

    return result;
}

interface ClassMember {
    name: string;
    descriptor: PropertyDescriptor;
    scope: any;
    parent: object;
}
