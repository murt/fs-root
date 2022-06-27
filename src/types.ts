/**
 * fs actually accepts several types as the parameter for a path. We are generally only concerned
 * with strings but in the interest of full API compliance we'll support all of them.
 */
export type PathParamType = string | Buffer | URL;
