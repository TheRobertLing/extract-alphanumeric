type Options = {
  include?: string;
  exclude?: string;
};

const escapeToRegex = (str: string): string => {
  // Escape any reserved symbols/characters e.g * -> \*
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&").replace(/\s+/g, "\\s+");
}

const createRegex = (
  include: string,
  exclude: string
): { whitelist: RegExp; blacklist: RegExp } => {
  const includeRegEx: string = escapeToRegex(include);
  const excludeRegEx: string = escapeToRegex(exclude);

  const whitelistPattern: string = `[^a-zA-Z0-9${includeRegEx}]`;
  const blacklistPattern: string = exclude ? `[${excludeRegEx}]` : "(?!)";

  const whitelist: RegExp = new RegExp(whitelistPattern, "gu");  
  const blacklist: RegExp = new RegExp(blacklistPattern, "gu");

  return {
    whitelist,
    blacklist,
  };
};


const extract = (
  input: string,
  {
    include = "",
    exclude = "",
  }: Options = {}
): string => {
  const { whitelist, blacklist } = createRegex(include, exclude);
  return input.replace(whitelist, "").replace(blacklist, "");
};
