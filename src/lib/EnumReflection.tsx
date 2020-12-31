export class EnumReflection {
  private static REGEXP: RegExp = /^[0-9]+$/g;

  private static isString<T>(name: string): boolean {
    if (name.match(this.REGEXP)) return false;

    return true;
  }

  public static getNames<T>(object: T): Array<string> {
    let result = new Array<string>();

    for (let name in object) {
      if (this.isString(name)) result.push(name);
    }

    return result;
  }

  // public static getValues<T>(object: T): Array<string | number> {
  //   let result = new Array<string | number>();

  //   for (let name in object) {
  //     if (this.isString(name)) result.push(<any>object[name]);
  //   }

  //   return result;
  // }
}
