import { extract, Options } from "../index";

type TestInput = {
  input: string;
  options?: Options;
};

type Test = [name: string, input: TestInput, expected: string];

const cases: Test[] = [
  [
    "simple",
    {
      input: "abcdefghijklmonpqrstuvwxyz1234567890ABCDEFGHIJKLMONPQRSTUVWXYZ",
    },
    "abcdefghijklmonpqrstuvwxyz1234567890ABCDEFGHIJKLMONPQRSTUVWXYZ",
  ],
  [
    "non alphanumeric",
    {
      input: "!@#$%^&*()[]{}\\;':\",./<>?``",
    },
    "",
  ],
  [
    "mixed",
    {
      input: "this is an alphanumeric string @#$%^&*()-_=+[{]};:'\", <.>/?|`~",
    },
    "thisisanalphanumericstring",
  ],
  [
    "whitelist test",
    {
      input: "!@# $%^& *()-= _+",
      options: {
        include: "!@#$%^&*()-=_+ ",
      },
    },
    "!@# $%^& *()-= _+",
  ],
  [
    "blacklist test",
    {
      input: "This string is normally valid1234",
      options: {
        exclude: "histrngnomalyvid 123",
      },
    },
    "T4",
  ],
  [
    "white/blacklist test",
    {
      input: "some input",
      options: {
        include: "some input",
        exclude: "some input",
      },
    },
    "",
  ],
  [
    "whitelist characters not present test",
    {
      input: "some input",
      options: {
        include: "192837192381",
      },
    },
    "someinput",
  ],
  [
    "blacklist characters not present test",
    {
      input: "some input",
      options: {
        exclude: "192837192381",
      },
    },
    "someinput",
  ],
  [
    "blacklist characters partially present test",
    {
      input: "some input",
      options: {
        exclude: "someqwryadfghjklzxcvb",
      },
    },
    "input",
  ],
  [
    "whitelist characters partially present test",
    {
      input: "some input",
      options: {
        include: "some ",
      },
    },
    "some input",
  ],
];

describe.each(cases)("Case", (name, input, expected) => {
  test(name, () => {
    expect(extract(input.input, input.options)).toBe(expected);
  });
});
