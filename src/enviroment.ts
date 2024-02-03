export class env {
  private static prod = "prod";
  private static test = "test";
  private static dev = "dev";

  public static PORT: string;
  public static DB_URL: string;
  public static JWT_SECRET: string;
  public static NODE_ENV: string;

  public static checkEnvValid() {
    this.PORT = process.env.PORT!;
    this.DB_URL = process.env.DB_URL!;
    this.JWT_SECRET = process.env.JWT_SECRET!;
    this.NODE_ENV = process.env.NODE_ENV!;
    if (![env.prod, env.test, env.dev].includes(env.NODE_ENV)) {
      throw new Error("NODE_ENV is not valid");
    }
    if ([env.PORT, env.DB_URL, env.JWT_SECRET, env.NODE_ENV].some((x) => !x)) {
      console.log([env.PORT, env.DB_URL, env.JWT_SECRET, env.NODE_ENV]);
      throw new Error("Some env variables are not set");
    }
  }
}
