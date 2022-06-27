import fsRoot from "../src";

import { confirmPath, isChildPath, absPath } from "../src/utils";

describe("paths", () => {
    it("should allow root paths", () => {
        expect(confirmPath("/example", "/")).toBeTruthy();
    });

    it("should allow paths from root", () => {
        expect(confirmPath("/example", "/good/okay/fine")).toBeTruthy();
    });

    it("should allow relative paths", () =>  {
        expect(confirmPath("/example", "./hello")).toBeTruthy();
    });

    it("should block child paths outside of the root", () => {
        expect(() => confirmPath("/example", "../bad")).toThrowError();
        expect(() => confirmPath("/example", "/../bad")).toThrowError();
        expect(() => confirmPath("/example", "/okay/../../bad")).toThrowError();
    });
});
