export class env {
  private static prod = "prod";
  private static test = "test";
  private static dev = "dev";

  public static PORT: string;
  public static DB_URL: string;
  public static JWT_SECRET: string;
  public static NODE_ENV: string;

  public static checkEnvValid() {
    this.DB_URL = process.env.DB_URL || "";
    this.JWT_SECRET = process.env.JWT_SECRET || "";
    this.NODE_ENV = process.env.NODE_ENV || "";
    this.PORT = process.env.PORT || "";
    if (!env.NODE_ENV) throw new Error("Missing environment variable: NODE_ENV");
    if (![env.prod, env.test, env.dev].includes(env.NODE_ENV)) {
      throw new Error("Wrong environment variable: NODE_ENV");
    }
    if ([env.DB_URL, env.JWT_SECRET, env.NODE_ENV].includes("")) {
      console.log(env.NODE_ENV, env.DB_URL, env.JWT_SECRET, env.PORT);

      throw new Error("Missing environment variables");
    }
    if (env.NODE_ENV !== env.prod && !env.PORT) {
      throw new Error("Missing environment variable: PORT");
    }
  }
}
