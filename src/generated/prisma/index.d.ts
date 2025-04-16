
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PublicVocabulary
 * 
 */
export type PublicVocabulary = $Result.DefaultSelection<Prisma.$PublicVocabularyPayload>
/**
 * Model PublicArticle
 * 
 */
export type PublicArticle = $Result.DefaultSelection<Prisma.$PublicArticlePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserVocabulary
 * 
 */
export type UserVocabulary = $Result.DefaultSelection<Prisma.$UserVocabularyPayload>
/**
 * Model UserArticle
 * 
 */
export type UserArticle = $Result.DefaultSelection<Prisma.$UserArticlePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PublicVocabularies
 * const publicVocabularies = await prisma.publicVocabulary.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PublicVocabularies
   * const publicVocabularies = await prisma.publicVocabulary.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.publicVocabulary`: Exposes CRUD operations for the **PublicVocabulary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PublicVocabularies
    * const publicVocabularies = await prisma.publicVocabulary.findMany()
    * ```
    */
  get publicVocabulary(): Prisma.PublicVocabularyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.publicArticle`: Exposes CRUD operations for the **PublicArticle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PublicArticles
    * const publicArticles = await prisma.publicArticle.findMany()
    * ```
    */
  get publicArticle(): Prisma.PublicArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userVocabulary`: Exposes CRUD operations for the **UserVocabulary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserVocabularies
    * const userVocabularies = await prisma.userVocabulary.findMany()
    * ```
    */
  get userVocabulary(): Prisma.UserVocabularyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userArticle`: Exposes CRUD operations for the **UserArticle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserArticles
    * const userArticles = await prisma.userArticle.findMany()
    * ```
    */
  get userArticle(): Prisma.UserArticleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PublicVocabulary: 'PublicVocabulary',
    PublicArticle: 'PublicArticle',
    User: 'User',
    UserVocabulary: 'UserVocabulary',
    UserArticle: 'UserArticle'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "publicVocabulary" | "publicArticle" | "user" | "userVocabulary" | "userArticle"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PublicVocabulary: {
        payload: Prisma.$PublicVocabularyPayload<ExtArgs>
        fields: Prisma.PublicVocabularyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PublicVocabularyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PublicVocabularyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload>
          }
          findFirst: {
            args: Prisma.PublicVocabularyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PublicVocabularyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload>
          }
          findMany: {
            args: Prisma.PublicVocabularyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload>[]
          }
          create: {
            args: Prisma.PublicVocabularyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload>
          }
          createMany: {
            args: Prisma.PublicVocabularyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PublicVocabularyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload>[]
          }
          delete: {
            args: Prisma.PublicVocabularyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload>
          }
          update: {
            args: Prisma.PublicVocabularyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload>
          }
          deleteMany: {
            args: Prisma.PublicVocabularyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PublicVocabularyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PublicVocabularyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload>[]
          }
          upsert: {
            args: Prisma.PublicVocabularyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicVocabularyPayload>
          }
          aggregate: {
            args: Prisma.PublicVocabularyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublicVocabulary>
          }
          groupBy: {
            args: Prisma.PublicVocabularyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicVocabularyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PublicVocabularyCountArgs<ExtArgs>
            result: $Utils.Optional<PublicVocabularyCountAggregateOutputType> | number
          }
        }
      }
      PublicArticle: {
        payload: Prisma.$PublicArticlePayload<ExtArgs>
        fields: Prisma.PublicArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PublicArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PublicArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload>
          }
          findFirst: {
            args: Prisma.PublicArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PublicArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload>
          }
          findMany: {
            args: Prisma.PublicArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload>[]
          }
          create: {
            args: Prisma.PublicArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload>
          }
          createMany: {
            args: Prisma.PublicArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PublicArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload>[]
          }
          delete: {
            args: Prisma.PublicArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload>
          }
          update: {
            args: Prisma.PublicArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload>
          }
          deleteMany: {
            args: Prisma.PublicArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PublicArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PublicArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload>[]
          }
          upsert: {
            args: Prisma.PublicArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicArticlePayload>
          }
          aggregate: {
            args: Prisma.PublicArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublicArticle>
          }
          groupBy: {
            args: Prisma.PublicArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PublicArticleCountArgs<ExtArgs>
            result: $Utils.Optional<PublicArticleCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserVocabulary: {
        payload: Prisma.$UserVocabularyPayload<ExtArgs>
        fields: Prisma.UserVocabularyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserVocabularyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserVocabularyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload>
          }
          findFirst: {
            args: Prisma.UserVocabularyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserVocabularyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload>
          }
          findMany: {
            args: Prisma.UserVocabularyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload>[]
          }
          create: {
            args: Prisma.UserVocabularyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload>
          }
          createMany: {
            args: Prisma.UserVocabularyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserVocabularyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload>[]
          }
          delete: {
            args: Prisma.UserVocabularyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload>
          }
          update: {
            args: Prisma.UserVocabularyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload>
          }
          deleteMany: {
            args: Prisma.UserVocabularyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserVocabularyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserVocabularyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload>[]
          }
          upsert: {
            args: Prisma.UserVocabularyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserVocabularyPayload>
          }
          aggregate: {
            args: Prisma.UserVocabularyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserVocabulary>
          }
          groupBy: {
            args: Prisma.UserVocabularyGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserVocabularyGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserVocabularyCountArgs<ExtArgs>
            result: $Utils.Optional<UserVocabularyCountAggregateOutputType> | number
          }
        }
      }
      UserArticle: {
        payload: Prisma.$UserArticlePayload<ExtArgs>
        fields: Prisma.UserArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload>
          }
          findFirst: {
            args: Prisma.UserArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload>
          }
          findMany: {
            args: Prisma.UserArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload>[]
          }
          create: {
            args: Prisma.UserArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload>
          }
          createMany: {
            args: Prisma.UserArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload>[]
          }
          delete: {
            args: Prisma.UserArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload>
          }
          update: {
            args: Prisma.UserArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload>
          }
          deleteMany: {
            args: Prisma.UserArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload>[]
          }
          upsert: {
            args: Prisma.UserArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArticlePayload>
          }
          aggregate: {
            args: Prisma.UserArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserArticle>
          }
          groupBy: {
            args: Prisma.UserArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserArticleCountArgs<ExtArgs>
            result: $Utils.Optional<UserArticleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    publicVocabulary?: PublicVocabularyOmit
    publicArticle?: PublicArticleOmit
    user?: UserOmit
    userVocabulary?: UserVocabularyOmit
    userArticle?: UserArticleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PublicVocabularyCountOutputType
   */

  export type PublicVocabularyCountOutputType = {
    userVocabularies: number
  }

  export type PublicVocabularyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userVocabularies?: boolean | PublicVocabularyCountOutputTypeCountUserVocabulariesArgs
  }

  // Custom InputTypes
  /**
   * PublicVocabularyCountOutputType without action
   */
  export type PublicVocabularyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabularyCountOutputType
     */
    select?: PublicVocabularyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PublicVocabularyCountOutputType without action
   */
  export type PublicVocabularyCountOutputTypeCountUserVocabulariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserVocabularyWhereInput
  }


  /**
   * Count Type PublicArticleCountOutputType
   */

  export type PublicArticleCountOutputType = {
    userArticles: number
  }

  export type PublicArticleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userArticles?: boolean | PublicArticleCountOutputTypeCountUserArticlesArgs
  }

  // Custom InputTypes
  /**
   * PublicArticleCountOutputType without action
   */
  export type PublicArticleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticleCountOutputType
     */
    select?: PublicArticleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PublicArticleCountOutputType without action
   */
  export type PublicArticleCountOutputTypeCountUserArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserArticleWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    userVocabularies: number
    userArticles: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userVocabularies?: boolean | UserCountOutputTypeCountUserVocabulariesArgs
    userArticles?: boolean | UserCountOutputTypeCountUserArticlesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserVocabulariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserVocabularyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserArticleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PublicVocabulary
   */

  export type AggregatePublicVocabulary = {
    _count: PublicVocabularyCountAggregateOutputType | null
    _avg: PublicVocabularyAvgAggregateOutputType | null
    _sum: PublicVocabularySumAggregateOutputType | null
    _min: PublicVocabularyMinAggregateOutputType | null
    _max: PublicVocabularyMaxAggregateOutputType | null
  }

  export type PublicVocabularyAvgAggregateOutputType = {
    id: number | null
  }

  export type PublicVocabularySumAggregateOutputType = {
    id: number | null
  }

  export type PublicVocabularyMinAggregateOutputType = {
    id: number | null
    word: string | null
    createdAt: Date | null
    updatedAt: Date | null
    partOfSpeech: string | null
    definition: string | null
    localDefinition: string | null
    example: string | null
    exampleTranslation: string | null
    pronunciation: string | null
    synonyms: string | null
    antonyms: string | null
  }

  export type PublicVocabularyMaxAggregateOutputType = {
    id: number | null
    word: string | null
    createdAt: Date | null
    updatedAt: Date | null
    partOfSpeech: string | null
    definition: string | null
    localDefinition: string | null
    example: string | null
    exampleTranslation: string | null
    pronunciation: string | null
    synonyms: string | null
    antonyms: string | null
  }

  export type PublicVocabularyCountAggregateOutputType = {
    id: number
    word: number
    createdAt: number
    updatedAt: number
    partOfSpeech: number
    definition: number
    localDefinition: number
    example: number
    exampleTranslation: number
    pronunciation: number
    synonyms: number
    antonyms: number
    _all: number
  }


  export type PublicVocabularyAvgAggregateInputType = {
    id?: true
  }

  export type PublicVocabularySumAggregateInputType = {
    id?: true
  }

  export type PublicVocabularyMinAggregateInputType = {
    id?: true
    word?: true
    createdAt?: true
    updatedAt?: true
    partOfSpeech?: true
    definition?: true
    localDefinition?: true
    example?: true
    exampleTranslation?: true
    pronunciation?: true
    synonyms?: true
    antonyms?: true
  }

  export type PublicVocabularyMaxAggregateInputType = {
    id?: true
    word?: true
    createdAt?: true
    updatedAt?: true
    partOfSpeech?: true
    definition?: true
    localDefinition?: true
    example?: true
    exampleTranslation?: true
    pronunciation?: true
    synonyms?: true
    antonyms?: true
  }

  export type PublicVocabularyCountAggregateInputType = {
    id?: true
    word?: true
    createdAt?: true
    updatedAt?: true
    partOfSpeech?: true
    definition?: true
    localDefinition?: true
    example?: true
    exampleTranslation?: true
    pronunciation?: true
    synonyms?: true
    antonyms?: true
    _all?: true
  }

  export type PublicVocabularyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicVocabulary to aggregate.
     */
    where?: PublicVocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicVocabularies to fetch.
     */
    orderBy?: PublicVocabularyOrderByWithRelationInput | PublicVocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PublicVocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicVocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicVocabularies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PublicVocabularies
    **/
    _count?: true | PublicVocabularyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PublicVocabularyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PublicVocabularySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicVocabularyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicVocabularyMaxAggregateInputType
  }

  export type GetPublicVocabularyAggregateType<T extends PublicVocabularyAggregateArgs> = {
        [P in keyof T & keyof AggregatePublicVocabulary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublicVocabulary[P]>
      : GetScalarType<T[P], AggregatePublicVocabulary[P]>
  }




  export type PublicVocabularyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicVocabularyWhereInput
    orderBy?: PublicVocabularyOrderByWithAggregationInput | PublicVocabularyOrderByWithAggregationInput[]
    by: PublicVocabularyScalarFieldEnum[] | PublicVocabularyScalarFieldEnum
    having?: PublicVocabularyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicVocabularyCountAggregateInputType | true
    _avg?: PublicVocabularyAvgAggregateInputType
    _sum?: PublicVocabularySumAggregateInputType
    _min?: PublicVocabularyMinAggregateInputType
    _max?: PublicVocabularyMaxAggregateInputType
  }

  export type PublicVocabularyGroupByOutputType = {
    id: number
    word: string
    createdAt: Date
    updatedAt: Date
    partOfSpeech: string
    definition: string
    localDefinition: string | null
    example: string | null
    exampleTranslation: string | null
    pronunciation: string | null
    synonyms: string | null
    antonyms: string | null
    _count: PublicVocabularyCountAggregateOutputType | null
    _avg: PublicVocabularyAvgAggregateOutputType | null
    _sum: PublicVocabularySumAggregateOutputType | null
    _min: PublicVocabularyMinAggregateOutputType | null
    _max: PublicVocabularyMaxAggregateOutputType | null
  }

  type GetPublicVocabularyGroupByPayload<T extends PublicVocabularyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicVocabularyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicVocabularyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicVocabularyGroupByOutputType[P]>
            : GetScalarType<T[P], PublicVocabularyGroupByOutputType[P]>
        }
      >
    >


  export type PublicVocabularySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    word?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partOfSpeech?: boolean
    definition?: boolean
    localDefinition?: boolean
    example?: boolean
    exampleTranslation?: boolean
    pronunciation?: boolean
    synonyms?: boolean
    antonyms?: boolean
    userVocabularies?: boolean | PublicVocabulary$userVocabulariesArgs<ExtArgs>
    _count?: boolean | PublicVocabularyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publicVocabulary"]>

  export type PublicVocabularySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    word?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partOfSpeech?: boolean
    definition?: boolean
    localDefinition?: boolean
    example?: boolean
    exampleTranslation?: boolean
    pronunciation?: boolean
    synonyms?: boolean
    antonyms?: boolean
  }, ExtArgs["result"]["publicVocabulary"]>

  export type PublicVocabularySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    word?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partOfSpeech?: boolean
    definition?: boolean
    localDefinition?: boolean
    example?: boolean
    exampleTranslation?: boolean
    pronunciation?: boolean
    synonyms?: boolean
    antonyms?: boolean
  }, ExtArgs["result"]["publicVocabulary"]>

  export type PublicVocabularySelectScalar = {
    id?: boolean
    word?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partOfSpeech?: boolean
    definition?: boolean
    localDefinition?: boolean
    example?: boolean
    exampleTranslation?: boolean
    pronunciation?: boolean
    synonyms?: boolean
    antonyms?: boolean
  }

  export type PublicVocabularyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "word" | "createdAt" | "updatedAt" | "partOfSpeech" | "definition" | "localDefinition" | "example" | "exampleTranslation" | "pronunciation" | "synonyms" | "antonyms", ExtArgs["result"]["publicVocabulary"]>
  export type PublicVocabularyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userVocabularies?: boolean | PublicVocabulary$userVocabulariesArgs<ExtArgs>
    _count?: boolean | PublicVocabularyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PublicVocabularyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PublicVocabularyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PublicVocabularyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PublicVocabulary"
    objects: {
      userVocabularies: Prisma.$UserVocabularyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      word: string
      createdAt: Date
      updatedAt: Date
      partOfSpeech: string
      definition: string
      localDefinition: string | null
      example: string | null
      exampleTranslation: string | null
      pronunciation: string | null
      synonyms: string | null
      antonyms: string | null
    }, ExtArgs["result"]["publicVocabulary"]>
    composites: {}
  }

  type PublicVocabularyGetPayload<S extends boolean | null | undefined | PublicVocabularyDefaultArgs> = $Result.GetResult<Prisma.$PublicVocabularyPayload, S>

  type PublicVocabularyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PublicVocabularyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PublicVocabularyCountAggregateInputType | true
    }

  export interface PublicVocabularyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PublicVocabulary'], meta: { name: 'PublicVocabulary' } }
    /**
     * Find zero or one PublicVocabulary that matches the filter.
     * @param {PublicVocabularyFindUniqueArgs} args - Arguments to find a PublicVocabulary
     * @example
     * // Get one PublicVocabulary
     * const publicVocabulary = await prisma.publicVocabulary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PublicVocabularyFindUniqueArgs>(args: SelectSubset<T, PublicVocabularyFindUniqueArgs<ExtArgs>>): Prisma__PublicVocabularyClient<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PublicVocabulary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PublicVocabularyFindUniqueOrThrowArgs} args - Arguments to find a PublicVocabulary
     * @example
     * // Get one PublicVocabulary
     * const publicVocabulary = await prisma.publicVocabulary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PublicVocabularyFindUniqueOrThrowArgs>(args: SelectSubset<T, PublicVocabularyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PublicVocabularyClient<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PublicVocabulary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicVocabularyFindFirstArgs} args - Arguments to find a PublicVocabulary
     * @example
     * // Get one PublicVocabulary
     * const publicVocabulary = await prisma.publicVocabulary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PublicVocabularyFindFirstArgs>(args?: SelectSubset<T, PublicVocabularyFindFirstArgs<ExtArgs>>): Prisma__PublicVocabularyClient<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PublicVocabulary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicVocabularyFindFirstOrThrowArgs} args - Arguments to find a PublicVocabulary
     * @example
     * // Get one PublicVocabulary
     * const publicVocabulary = await prisma.publicVocabulary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PublicVocabularyFindFirstOrThrowArgs>(args?: SelectSubset<T, PublicVocabularyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PublicVocabularyClient<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PublicVocabularies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicVocabularyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PublicVocabularies
     * const publicVocabularies = await prisma.publicVocabulary.findMany()
     * 
     * // Get first 10 PublicVocabularies
     * const publicVocabularies = await prisma.publicVocabulary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicVocabularyWithIdOnly = await prisma.publicVocabulary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PublicVocabularyFindManyArgs>(args?: SelectSubset<T, PublicVocabularyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PublicVocabulary.
     * @param {PublicVocabularyCreateArgs} args - Arguments to create a PublicVocabulary.
     * @example
     * // Create one PublicVocabulary
     * const PublicVocabulary = await prisma.publicVocabulary.create({
     *   data: {
     *     // ... data to create a PublicVocabulary
     *   }
     * })
     * 
     */
    create<T extends PublicVocabularyCreateArgs>(args: SelectSubset<T, PublicVocabularyCreateArgs<ExtArgs>>): Prisma__PublicVocabularyClient<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PublicVocabularies.
     * @param {PublicVocabularyCreateManyArgs} args - Arguments to create many PublicVocabularies.
     * @example
     * // Create many PublicVocabularies
     * const publicVocabulary = await prisma.publicVocabulary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PublicVocabularyCreateManyArgs>(args?: SelectSubset<T, PublicVocabularyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PublicVocabularies and returns the data saved in the database.
     * @param {PublicVocabularyCreateManyAndReturnArgs} args - Arguments to create many PublicVocabularies.
     * @example
     * // Create many PublicVocabularies
     * const publicVocabulary = await prisma.publicVocabulary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PublicVocabularies and only return the `id`
     * const publicVocabularyWithIdOnly = await prisma.publicVocabulary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PublicVocabularyCreateManyAndReturnArgs>(args?: SelectSubset<T, PublicVocabularyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PublicVocabulary.
     * @param {PublicVocabularyDeleteArgs} args - Arguments to delete one PublicVocabulary.
     * @example
     * // Delete one PublicVocabulary
     * const PublicVocabulary = await prisma.publicVocabulary.delete({
     *   where: {
     *     // ... filter to delete one PublicVocabulary
     *   }
     * })
     * 
     */
    delete<T extends PublicVocabularyDeleteArgs>(args: SelectSubset<T, PublicVocabularyDeleteArgs<ExtArgs>>): Prisma__PublicVocabularyClient<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PublicVocabulary.
     * @param {PublicVocabularyUpdateArgs} args - Arguments to update one PublicVocabulary.
     * @example
     * // Update one PublicVocabulary
     * const publicVocabulary = await prisma.publicVocabulary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PublicVocabularyUpdateArgs>(args: SelectSubset<T, PublicVocabularyUpdateArgs<ExtArgs>>): Prisma__PublicVocabularyClient<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PublicVocabularies.
     * @param {PublicVocabularyDeleteManyArgs} args - Arguments to filter PublicVocabularies to delete.
     * @example
     * // Delete a few PublicVocabularies
     * const { count } = await prisma.publicVocabulary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PublicVocabularyDeleteManyArgs>(args?: SelectSubset<T, PublicVocabularyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PublicVocabularies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicVocabularyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PublicVocabularies
     * const publicVocabulary = await prisma.publicVocabulary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PublicVocabularyUpdateManyArgs>(args: SelectSubset<T, PublicVocabularyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PublicVocabularies and returns the data updated in the database.
     * @param {PublicVocabularyUpdateManyAndReturnArgs} args - Arguments to update many PublicVocabularies.
     * @example
     * // Update many PublicVocabularies
     * const publicVocabulary = await prisma.publicVocabulary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PublicVocabularies and only return the `id`
     * const publicVocabularyWithIdOnly = await prisma.publicVocabulary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PublicVocabularyUpdateManyAndReturnArgs>(args: SelectSubset<T, PublicVocabularyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PublicVocabulary.
     * @param {PublicVocabularyUpsertArgs} args - Arguments to update or create a PublicVocabulary.
     * @example
     * // Update or create a PublicVocabulary
     * const publicVocabulary = await prisma.publicVocabulary.upsert({
     *   create: {
     *     // ... data to create a PublicVocabulary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PublicVocabulary we want to update
     *   }
     * })
     */
    upsert<T extends PublicVocabularyUpsertArgs>(args: SelectSubset<T, PublicVocabularyUpsertArgs<ExtArgs>>): Prisma__PublicVocabularyClient<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PublicVocabularies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicVocabularyCountArgs} args - Arguments to filter PublicVocabularies to count.
     * @example
     * // Count the number of PublicVocabularies
     * const count = await prisma.publicVocabulary.count({
     *   where: {
     *     // ... the filter for the PublicVocabularies we want to count
     *   }
     * })
    **/
    count<T extends PublicVocabularyCountArgs>(
      args?: Subset<T, PublicVocabularyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicVocabularyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PublicVocabulary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicVocabularyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PublicVocabularyAggregateArgs>(args: Subset<T, PublicVocabularyAggregateArgs>): Prisma.PrismaPromise<GetPublicVocabularyAggregateType<T>>

    /**
     * Group by PublicVocabulary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicVocabularyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PublicVocabularyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PublicVocabularyGroupByArgs['orderBy'] }
        : { orderBy?: PublicVocabularyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PublicVocabularyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicVocabularyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PublicVocabulary model
   */
  readonly fields: PublicVocabularyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PublicVocabulary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PublicVocabularyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userVocabularies<T extends PublicVocabulary$userVocabulariesArgs<ExtArgs> = {}>(args?: Subset<T, PublicVocabulary$userVocabulariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PublicVocabulary model
   */
  interface PublicVocabularyFieldRefs {
    readonly id: FieldRef<"PublicVocabulary", 'Int'>
    readonly word: FieldRef<"PublicVocabulary", 'String'>
    readonly createdAt: FieldRef<"PublicVocabulary", 'DateTime'>
    readonly updatedAt: FieldRef<"PublicVocabulary", 'DateTime'>
    readonly partOfSpeech: FieldRef<"PublicVocabulary", 'String'>
    readonly definition: FieldRef<"PublicVocabulary", 'String'>
    readonly localDefinition: FieldRef<"PublicVocabulary", 'String'>
    readonly example: FieldRef<"PublicVocabulary", 'String'>
    readonly exampleTranslation: FieldRef<"PublicVocabulary", 'String'>
    readonly pronunciation: FieldRef<"PublicVocabulary", 'String'>
    readonly synonyms: FieldRef<"PublicVocabulary", 'String'>
    readonly antonyms: FieldRef<"PublicVocabulary", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PublicVocabulary findUnique
   */
  export type PublicVocabularyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicVocabularyInclude<ExtArgs> | null
    /**
     * Filter, which PublicVocabulary to fetch.
     */
    where: PublicVocabularyWhereUniqueInput
  }

  /**
   * PublicVocabulary findUniqueOrThrow
   */
  export type PublicVocabularyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicVocabularyInclude<ExtArgs> | null
    /**
     * Filter, which PublicVocabulary to fetch.
     */
    where: PublicVocabularyWhereUniqueInput
  }

  /**
   * PublicVocabulary findFirst
   */
  export type PublicVocabularyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicVocabularyInclude<ExtArgs> | null
    /**
     * Filter, which PublicVocabulary to fetch.
     */
    where?: PublicVocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicVocabularies to fetch.
     */
    orderBy?: PublicVocabularyOrderByWithRelationInput | PublicVocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicVocabularies.
     */
    cursor?: PublicVocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicVocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicVocabularies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicVocabularies.
     */
    distinct?: PublicVocabularyScalarFieldEnum | PublicVocabularyScalarFieldEnum[]
  }

  /**
   * PublicVocabulary findFirstOrThrow
   */
  export type PublicVocabularyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicVocabularyInclude<ExtArgs> | null
    /**
     * Filter, which PublicVocabulary to fetch.
     */
    where?: PublicVocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicVocabularies to fetch.
     */
    orderBy?: PublicVocabularyOrderByWithRelationInput | PublicVocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicVocabularies.
     */
    cursor?: PublicVocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicVocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicVocabularies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicVocabularies.
     */
    distinct?: PublicVocabularyScalarFieldEnum | PublicVocabularyScalarFieldEnum[]
  }

  /**
   * PublicVocabulary findMany
   */
  export type PublicVocabularyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicVocabularyInclude<ExtArgs> | null
    /**
     * Filter, which PublicVocabularies to fetch.
     */
    where?: PublicVocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicVocabularies to fetch.
     */
    orderBy?: PublicVocabularyOrderByWithRelationInput | PublicVocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PublicVocabularies.
     */
    cursor?: PublicVocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicVocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicVocabularies.
     */
    skip?: number
    distinct?: PublicVocabularyScalarFieldEnum | PublicVocabularyScalarFieldEnum[]
  }

  /**
   * PublicVocabulary create
   */
  export type PublicVocabularyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicVocabularyInclude<ExtArgs> | null
    /**
     * The data needed to create a PublicVocabulary.
     */
    data: XOR<PublicVocabularyCreateInput, PublicVocabularyUncheckedCreateInput>
  }

  /**
   * PublicVocabulary createMany
   */
  export type PublicVocabularyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PublicVocabularies.
     */
    data: PublicVocabularyCreateManyInput | PublicVocabularyCreateManyInput[]
  }

  /**
   * PublicVocabulary createManyAndReturn
   */
  export type PublicVocabularyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * The data used to create many PublicVocabularies.
     */
    data: PublicVocabularyCreateManyInput | PublicVocabularyCreateManyInput[]
  }

  /**
   * PublicVocabulary update
   */
  export type PublicVocabularyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicVocabularyInclude<ExtArgs> | null
    /**
     * The data needed to update a PublicVocabulary.
     */
    data: XOR<PublicVocabularyUpdateInput, PublicVocabularyUncheckedUpdateInput>
    /**
     * Choose, which PublicVocabulary to update.
     */
    where: PublicVocabularyWhereUniqueInput
  }

  /**
   * PublicVocabulary updateMany
   */
  export type PublicVocabularyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PublicVocabularies.
     */
    data: XOR<PublicVocabularyUpdateManyMutationInput, PublicVocabularyUncheckedUpdateManyInput>
    /**
     * Filter which PublicVocabularies to update
     */
    where?: PublicVocabularyWhereInput
    /**
     * Limit how many PublicVocabularies to update.
     */
    limit?: number
  }

  /**
   * PublicVocabulary updateManyAndReturn
   */
  export type PublicVocabularyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * The data used to update PublicVocabularies.
     */
    data: XOR<PublicVocabularyUpdateManyMutationInput, PublicVocabularyUncheckedUpdateManyInput>
    /**
     * Filter which PublicVocabularies to update
     */
    where?: PublicVocabularyWhereInput
    /**
     * Limit how many PublicVocabularies to update.
     */
    limit?: number
  }

  /**
   * PublicVocabulary upsert
   */
  export type PublicVocabularyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicVocabularyInclude<ExtArgs> | null
    /**
     * The filter to search for the PublicVocabulary to update in case it exists.
     */
    where: PublicVocabularyWhereUniqueInput
    /**
     * In case the PublicVocabulary found by the `where` argument doesn't exist, create a new PublicVocabulary with this data.
     */
    create: XOR<PublicVocabularyCreateInput, PublicVocabularyUncheckedCreateInput>
    /**
     * In case the PublicVocabulary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PublicVocabularyUpdateInput, PublicVocabularyUncheckedUpdateInput>
  }

  /**
   * PublicVocabulary delete
   */
  export type PublicVocabularyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicVocabularyInclude<ExtArgs> | null
    /**
     * Filter which PublicVocabulary to delete.
     */
    where: PublicVocabularyWhereUniqueInput
  }

  /**
   * PublicVocabulary deleteMany
   */
  export type PublicVocabularyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicVocabularies to delete
     */
    where?: PublicVocabularyWhereInput
    /**
     * Limit how many PublicVocabularies to delete.
     */
    limit?: number
  }

  /**
   * PublicVocabulary.userVocabularies
   */
  export type PublicVocabulary$userVocabulariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    where?: UserVocabularyWhereInput
    orderBy?: UserVocabularyOrderByWithRelationInput | UserVocabularyOrderByWithRelationInput[]
    cursor?: UserVocabularyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserVocabularyScalarFieldEnum | UserVocabularyScalarFieldEnum[]
  }

  /**
   * PublicVocabulary without action
   */
  export type PublicVocabularyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicVocabulary
     */
    select?: PublicVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicVocabulary
     */
    omit?: PublicVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicVocabularyInclude<ExtArgs> | null
  }


  /**
   * Model PublicArticle
   */

  export type AggregatePublicArticle = {
    _count: PublicArticleCountAggregateOutputType | null
    _avg: PublicArticleAvgAggregateOutputType | null
    _sum: PublicArticleSumAggregateOutputType | null
    _min: PublicArticleMinAggregateOutputType | null
    _max: PublicArticleMaxAggregateOutputType | null
  }

  export type PublicArticleAvgAggregateOutputType = {
    id: number | null
  }

  export type PublicArticleSumAggregateOutputType = {
    id: number | null
  }

  export type PublicArticleMinAggregateOutputType = {
    id: number | null
    slug: string | null
    title: string | null
    content: string | null
    publishedAt: Date | null
    updatedAt: Date | null
    author: string | null
    coverImage: string | null
  }

  export type PublicArticleMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    title: string | null
    content: string | null
    publishedAt: Date | null
    updatedAt: Date | null
    author: string | null
    coverImage: string | null
  }

  export type PublicArticleCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    content: number
    publishedAt: number
    updatedAt: number
    author: number
    coverImage: number
    _all: number
  }


  export type PublicArticleAvgAggregateInputType = {
    id?: true
  }

  export type PublicArticleSumAggregateInputType = {
    id?: true
  }

  export type PublicArticleMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    content?: true
    publishedAt?: true
    updatedAt?: true
    author?: true
    coverImage?: true
  }

  export type PublicArticleMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    content?: true
    publishedAt?: true
    updatedAt?: true
    author?: true
    coverImage?: true
  }

  export type PublicArticleCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    content?: true
    publishedAt?: true
    updatedAt?: true
    author?: true
    coverImage?: true
    _all?: true
  }

  export type PublicArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicArticle to aggregate.
     */
    where?: PublicArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicArticles to fetch.
     */
    orderBy?: PublicArticleOrderByWithRelationInput | PublicArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PublicArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PublicArticles
    **/
    _count?: true | PublicArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PublicArticleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PublicArticleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicArticleMaxAggregateInputType
  }

  export type GetPublicArticleAggregateType<T extends PublicArticleAggregateArgs> = {
        [P in keyof T & keyof AggregatePublicArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublicArticle[P]>
      : GetScalarType<T[P], AggregatePublicArticle[P]>
  }




  export type PublicArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicArticleWhereInput
    orderBy?: PublicArticleOrderByWithAggregationInput | PublicArticleOrderByWithAggregationInput[]
    by: PublicArticleScalarFieldEnum[] | PublicArticleScalarFieldEnum
    having?: PublicArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicArticleCountAggregateInputType | true
    _avg?: PublicArticleAvgAggregateInputType
    _sum?: PublicArticleSumAggregateInputType
    _min?: PublicArticleMinAggregateInputType
    _max?: PublicArticleMaxAggregateInputType
  }

  export type PublicArticleGroupByOutputType = {
    id: number
    slug: string
    title: string
    content: string
    publishedAt: Date
    updatedAt: Date
    author: string | null
    coverImage: string | null
    _count: PublicArticleCountAggregateOutputType | null
    _avg: PublicArticleAvgAggregateOutputType | null
    _sum: PublicArticleSumAggregateOutputType | null
    _min: PublicArticleMinAggregateOutputType | null
    _max: PublicArticleMaxAggregateOutputType | null
  }

  type GetPublicArticleGroupByPayload<T extends PublicArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicArticleGroupByOutputType[P]>
            : GetScalarType<T[P], PublicArticleGroupByOutputType[P]>
        }
      >
    >


  export type PublicArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    content?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
    author?: boolean
    coverImage?: boolean
    userArticles?: boolean | PublicArticle$userArticlesArgs<ExtArgs>
    _count?: boolean | PublicArticleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publicArticle"]>

  export type PublicArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    content?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
    author?: boolean
    coverImage?: boolean
  }, ExtArgs["result"]["publicArticle"]>

  export type PublicArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    content?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
    author?: boolean
    coverImage?: boolean
  }, ExtArgs["result"]["publicArticle"]>

  export type PublicArticleSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    content?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
    author?: boolean
    coverImage?: boolean
  }

  export type PublicArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "title" | "content" | "publishedAt" | "updatedAt" | "author" | "coverImage", ExtArgs["result"]["publicArticle"]>
  export type PublicArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userArticles?: boolean | PublicArticle$userArticlesArgs<ExtArgs>
    _count?: boolean | PublicArticleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PublicArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PublicArticleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PublicArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PublicArticle"
    objects: {
      userArticles: Prisma.$UserArticlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      title: string
      content: string
      publishedAt: Date
      updatedAt: Date
      author: string | null
      coverImage: string | null
    }, ExtArgs["result"]["publicArticle"]>
    composites: {}
  }

  type PublicArticleGetPayload<S extends boolean | null | undefined | PublicArticleDefaultArgs> = $Result.GetResult<Prisma.$PublicArticlePayload, S>

  type PublicArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PublicArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PublicArticleCountAggregateInputType | true
    }

  export interface PublicArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PublicArticle'], meta: { name: 'PublicArticle' } }
    /**
     * Find zero or one PublicArticle that matches the filter.
     * @param {PublicArticleFindUniqueArgs} args - Arguments to find a PublicArticle
     * @example
     * // Get one PublicArticle
     * const publicArticle = await prisma.publicArticle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PublicArticleFindUniqueArgs>(args: SelectSubset<T, PublicArticleFindUniqueArgs<ExtArgs>>): Prisma__PublicArticleClient<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PublicArticle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PublicArticleFindUniqueOrThrowArgs} args - Arguments to find a PublicArticle
     * @example
     * // Get one PublicArticle
     * const publicArticle = await prisma.publicArticle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PublicArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, PublicArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PublicArticleClient<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PublicArticle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicArticleFindFirstArgs} args - Arguments to find a PublicArticle
     * @example
     * // Get one PublicArticle
     * const publicArticle = await prisma.publicArticle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PublicArticleFindFirstArgs>(args?: SelectSubset<T, PublicArticleFindFirstArgs<ExtArgs>>): Prisma__PublicArticleClient<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PublicArticle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicArticleFindFirstOrThrowArgs} args - Arguments to find a PublicArticle
     * @example
     * // Get one PublicArticle
     * const publicArticle = await prisma.publicArticle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PublicArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, PublicArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PublicArticleClient<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PublicArticles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PublicArticles
     * const publicArticles = await prisma.publicArticle.findMany()
     * 
     * // Get first 10 PublicArticles
     * const publicArticles = await prisma.publicArticle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicArticleWithIdOnly = await prisma.publicArticle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PublicArticleFindManyArgs>(args?: SelectSubset<T, PublicArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PublicArticle.
     * @param {PublicArticleCreateArgs} args - Arguments to create a PublicArticle.
     * @example
     * // Create one PublicArticle
     * const PublicArticle = await prisma.publicArticle.create({
     *   data: {
     *     // ... data to create a PublicArticle
     *   }
     * })
     * 
     */
    create<T extends PublicArticleCreateArgs>(args: SelectSubset<T, PublicArticleCreateArgs<ExtArgs>>): Prisma__PublicArticleClient<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PublicArticles.
     * @param {PublicArticleCreateManyArgs} args - Arguments to create many PublicArticles.
     * @example
     * // Create many PublicArticles
     * const publicArticle = await prisma.publicArticle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PublicArticleCreateManyArgs>(args?: SelectSubset<T, PublicArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PublicArticles and returns the data saved in the database.
     * @param {PublicArticleCreateManyAndReturnArgs} args - Arguments to create many PublicArticles.
     * @example
     * // Create many PublicArticles
     * const publicArticle = await prisma.publicArticle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PublicArticles and only return the `id`
     * const publicArticleWithIdOnly = await prisma.publicArticle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PublicArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, PublicArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PublicArticle.
     * @param {PublicArticleDeleteArgs} args - Arguments to delete one PublicArticle.
     * @example
     * // Delete one PublicArticle
     * const PublicArticle = await prisma.publicArticle.delete({
     *   where: {
     *     // ... filter to delete one PublicArticle
     *   }
     * })
     * 
     */
    delete<T extends PublicArticleDeleteArgs>(args: SelectSubset<T, PublicArticleDeleteArgs<ExtArgs>>): Prisma__PublicArticleClient<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PublicArticle.
     * @param {PublicArticleUpdateArgs} args - Arguments to update one PublicArticle.
     * @example
     * // Update one PublicArticle
     * const publicArticle = await prisma.publicArticle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PublicArticleUpdateArgs>(args: SelectSubset<T, PublicArticleUpdateArgs<ExtArgs>>): Prisma__PublicArticleClient<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PublicArticles.
     * @param {PublicArticleDeleteManyArgs} args - Arguments to filter PublicArticles to delete.
     * @example
     * // Delete a few PublicArticles
     * const { count } = await prisma.publicArticle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PublicArticleDeleteManyArgs>(args?: SelectSubset<T, PublicArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PublicArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PublicArticles
     * const publicArticle = await prisma.publicArticle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PublicArticleUpdateManyArgs>(args: SelectSubset<T, PublicArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PublicArticles and returns the data updated in the database.
     * @param {PublicArticleUpdateManyAndReturnArgs} args - Arguments to update many PublicArticles.
     * @example
     * // Update many PublicArticles
     * const publicArticle = await prisma.publicArticle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PublicArticles and only return the `id`
     * const publicArticleWithIdOnly = await prisma.publicArticle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PublicArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, PublicArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PublicArticle.
     * @param {PublicArticleUpsertArgs} args - Arguments to update or create a PublicArticle.
     * @example
     * // Update or create a PublicArticle
     * const publicArticle = await prisma.publicArticle.upsert({
     *   create: {
     *     // ... data to create a PublicArticle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PublicArticle we want to update
     *   }
     * })
     */
    upsert<T extends PublicArticleUpsertArgs>(args: SelectSubset<T, PublicArticleUpsertArgs<ExtArgs>>): Prisma__PublicArticleClient<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PublicArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicArticleCountArgs} args - Arguments to filter PublicArticles to count.
     * @example
     * // Count the number of PublicArticles
     * const count = await prisma.publicArticle.count({
     *   where: {
     *     // ... the filter for the PublicArticles we want to count
     *   }
     * })
    **/
    count<T extends PublicArticleCountArgs>(
      args?: Subset<T, PublicArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PublicArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PublicArticleAggregateArgs>(args: Subset<T, PublicArticleAggregateArgs>): Prisma.PrismaPromise<GetPublicArticleAggregateType<T>>

    /**
     * Group by PublicArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PublicArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PublicArticleGroupByArgs['orderBy'] }
        : { orderBy?: PublicArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PublicArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PublicArticle model
   */
  readonly fields: PublicArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PublicArticle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PublicArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userArticles<T extends PublicArticle$userArticlesArgs<ExtArgs> = {}>(args?: Subset<T, PublicArticle$userArticlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PublicArticle model
   */
  interface PublicArticleFieldRefs {
    readonly id: FieldRef<"PublicArticle", 'Int'>
    readonly slug: FieldRef<"PublicArticle", 'String'>
    readonly title: FieldRef<"PublicArticle", 'String'>
    readonly content: FieldRef<"PublicArticle", 'String'>
    readonly publishedAt: FieldRef<"PublicArticle", 'DateTime'>
    readonly updatedAt: FieldRef<"PublicArticle", 'DateTime'>
    readonly author: FieldRef<"PublicArticle", 'String'>
    readonly coverImage: FieldRef<"PublicArticle", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PublicArticle findUnique
   */
  export type PublicArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicArticleInclude<ExtArgs> | null
    /**
     * Filter, which PublicArticle to fetch.
     */
    where: PublicArticleWhereUniqueInput
  }

  /**
   * PublicArticle findUniqueOrThrow
   */
  export type PublicArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicArticleInclude<ExtArgs> | null
    /**
     * Filter, which PublicArticle to fetch.
     */
    where: PublicArticleWhereUniqueInput
  }

  /**
   * PublicArticle findFirst
   */
  export type PublicArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicArticleInclude<ExtArgs> | null
    /**
     * Filter, which PublicArticle to fetch.
     */
    where?: PublicArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicArticles to fetch.
     */
    orderBy?: PublicArticleOrderByWithRelationInput | PublicArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicArticles.
     */
    cursor?: PublicArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicArticles.
     */
    distinct?: PublicArticleScalarFieldEnum | PublicArticleScalarFieldEnum[]
  }

  /**
   * PublicArticle findFirstOrThrow
   */
  export type PublicArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicArticleInclude<ExtArgs> | null
    /**
     * Filter, which PublicArticle to fetch.
     */
    where?: PublicArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicArticles to fetch.
     */
    orderBy?: PublicArticleOrderByWithRelationInput | PublicArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicArticles.
     */
    cursor?: PublicArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicArticles.
     */
    distinct?: PublicArticleScalarFieldEnum | PublicArticleScalarFieldEnum[]
  }

  /**
   * PublicArticle findMany
   */
  export type PublicArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicArticleInclude<ExtArgs> | null
    /**
     * Filter, which PublicArticles to fetch.
     */
    where?: PublicArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicArticles to fetch.
     */
    orderBy?: PublicArticleOrderByWithRelationInput | PublicArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PublicArticles.
     */
    cursor?: PublicArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicArticles.
     */
    skip?: number
    distinct?: PublicArticleScalarFieldEnum | PublicArticleScalarFieldEnum[]
  }

  /**
   * PublicArticle create
   */
  export type PublicArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a PublicArticle.
     */
    data: XOR<PublicArticleCreateInput, PublicArticleUncheckedCreateInput>
  }

  /**
   * PublicArticle createMany
   */
  export type PublicArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PublicArticles.
     */
    data: PublicArticleCreateManyInput | PublicArticleCreateManyInput[]
  }

  /**
   * PublicArticle createManyAndReturn
   */
  export type PublicArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * The data used to create many PublicArticles.
     */
    data: PublicArticleCreateManyInput | PublicArticleCreateManyInput[]
  }

  /**
   * PublicArticle update
   */
  export type PublicArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a PublicArticle.
     */
    data: XOR<PublicArticleUpdateInput, PublicArticleUncheckedUpdateInput>
    /**
     * Choose, which PublicArticle to update.
     */
    where: PublicArticleWhereUniqueInput
  }

  /**
   * PublicArticle updateMany
   */
  export type PublicArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PublicArticles.
     */
    data: XOR<PublicArticleUpdateManyMutationInput, PublicArticleUncheckedUpdateManyInput>
    /**
     * Filter which PublicArticles to update
     */
    where?: PublicArticleWhereInput
    /**
     * Limit how many PublicArticles to update.
     */
    limit?: number
  }

  /**
   * PublicArticle updateManyAndReturn
   */
  export type PublicArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * The data used to update PublicArticles.
     */
    data: XOR<PublicArticleUpdateManyMutationInput, PublicArticleUncheckedUpdateManyInput>
    /**
     * Filter which PublicArticles to update
     */
    where?: PublicArticleWhereInput
    /**
     * Limit how many PublicArticles to update.
     */
    limit?: number
  }

  /**
   * PublicArticle upsert
   */
  export type PublicArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the PublicArticle to update in case it exists.
     */
    where: PublicArticleWhereUniqueInput
    /**
     * In case the PublicArticle found by the `where` argument doesn't exist, create a new PublicArticle with this data.
     */
    create: XOR<PublicArticleCreateInput, PublicArticleUncheckedCreateInput>
    /**
     * In case the PublicArticle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PublicArticleUpdateInput, PublicArticleUncheckedUpdateInput>
  }

  /**
   * PublicArticle delete
   */
  export type PublicArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicArticleInclude<ExtArgs> | null
    /**
     * Filter which PublicArticle to delete.
     */
    where: PublicArticleWhereUniqueInput
  }

  /**
   * PublicArticle deleteMany
   */
  export type PublicArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicArticles to delete
     */
    where?: PublicArticleWhereInput
    /**
     * Limit how many PublicArticles to delete.
     */
    limit?: number
  }

  /**
   * PublicArticle.userArticles
   */
  export type PublicArticle$userArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    where?: UserArticleWhereInput
    orderBy?: UserArticleOrderByWithRelationInput | UserArticleOrderByWithRelationInput[]
    cursor?: UserArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserArticleScalarFieldEnum | UserArticleScalarFieldEnum[]
  }

  /**
   * PublicArticle without action
   */
  export type PublicArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicArticle
     */
    select?: PublicArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicArticle
     */
    omit?: PublicArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicArticleInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    nativeLanguage: string | null
    emailVerified: boolean | null
    verificationToken: string | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    nativeLanguage: string | null
    emailVerified: boolean | null
    verificationToken: string | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    createdAt: number
    updatedAt: number
    nativeLanguage: number
    emailVerified: number
    verificationToken: number
    resetPasswordToken: number
    resetPasswordExpires: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    nativeLanguage?: true
    emailVerified?: true
    verificationToken?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    nativeLanguage?: true
    emailVerified?: true
    verificationToken?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    nativeLanguage?: true
    emailVerified?: true
    verificationToken?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    nativeLanguage: string | null
    emailVerified: boolean
    verificationToken: string | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    nativeLanguage?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
    userVocabularies?: boolean | User$userVocabulariesArgs<ExtArgs>
    userArticles?: boolean | User$userArticlesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    nativeLanguage?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    nativeLanguage?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    nativeLanguage?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "createdAt" | "updatedAt" | "nativeLanguage" | "emailVerified" | "verificationToken" | "resetPasswordToken" | "resetPasswordExpires", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userVocabularies?: boolean | User$userVocabulariesArgs<ExtArgs>
    userArticles?: boolean | User$userArticlesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      userVocabularies: Prisma.$UserVocabularyPayload<ExtArgs>[]
      userArticles: Prisma.$UserArticlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string | null
      createdAt: Date
      updatedAt: Date
      nativeLanguage: string | null
      emailVerified: boolean
      verificationToken: string | null
      resetPasswordToken: string | null
      resetPasswordExpires: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userVocabularies<T extends User$userVocabulariesArgs<ExtArgs> = {}>(args?: Subset<T, User$userVocabulariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userArticles<T extends User$userArticlesArgs<ExtArgs> = {}>(args?: Subset<T, User$userArticlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly nativeLanguage: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly verificationToken: FieldRef<"User", 'String'>
    readonly resetPasswordToken: FieldRef<"User", 'String'>
    readonly resetPasswordExpires: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.userVocabularies
   */
  export type User$userVocabulariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    where?: UserVocabularyWhereInput
    orderBy?: UserVocabularyOrderByWithRelationInput | UserVocabularyOrderByWithRelationInput[]
    cursor?: UserVocabularyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserVocabularyScalarFieldEnum | UserVocabularyScalarFieldEnum[]
  }

  /**
   * User.userArticles
   */
  export type User$userArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    where?: UserArticleWhereInput
    orderBy?: UserArticleOrderByWithRelationInput | UserArticleOrderByWithRelationInput[]
    cursor?: UserArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserArticleScalarFieldEnum | UserArticleScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserVocabulary
   */

  export type AggregateUserVocabulary = {
    _count: UserVocabularyCountAggregateOutputType | null
    _avg: UserVocabularyAvgAggregateOutputType | null
    _sum: UserVocabularySumAggregateOutputType | null
    _min: UserVocabularyMinAggregateOutputType | null
    _max: UserVocabularyMaxAggregateOutputType | null
  }

  export type UserVocabularyAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    publicVocabularyId: number | null
    familiarity: number | null
  }

  export type UserVocabularySumAggregateOutputType = {
    id: number | null
    userId: number | null
    publicVocabularyId: number | null
    familiarity: number | null
  }

  export type UserVocabularyMinAggregateOutputType = {
    id: number | null
    userId: number | null
    publicVocabularyId: number | null
    addedAt: Date | null
    familiarity: number | null
    personalNote: string | null
    customDefinition: string | null
    customExample: string | null
  }

  export type UserVocabularyMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    publicVocabularyId: number | null
    addedAt: Date | null
    familiarity: number | null
    personalNote: string | null
    customDefinition: string | null
    customExample: string | null
  }

  export type UserVocabularyCountAggregateOutputType = {
    id: number
    userId: number
    publicVocabularyId: number
    addedAt: number
    familiarity: number
    personalNote: number
    customDefinition: number
    customExample: number
    _all: number
  }


  export type UserVocabularyAvgAggregateInputType = {
    id?: true
    userId?: true
    publicVocabularyId?: true
    familiarity?: true
  }

  export type UserVocabularySumAggregateInputType = {
    id?: true
    userId?: true
    publicVocabularyId?: true
    familiarity?: true
  }

  export type UserVocabularyMinAggregateInputType = {
    id?: true
    userId?: true
    publicVocabularyId?: true
    addedAt?: true
    familiarity?: true
    personalNote?: true
    customDefinition?: true
    customExample?: true
  }

  export type UserVocabularyMaxAggregateInputType = {
    id?: true
    userId?: true
    publicVocabularyId?: true
    addedAt?: true
    familiarity?: true
    personalNote?: true
    customDefinition?: true
    customExample?: true
  }

  export type UserVocabularyCountAggregateInputType = {
    id?: true
    userId?: true
    publicVocabularyId?: true
    addedAt?: true
    familiarity?: true
    personalNote?: true
    customDefinition?: true
    customExample?: true
    _all?: true
  }

  export type UserVocabularyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserVocabulary to aggregate.
     */
    where?: UserVocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVocabularies to fetch.
     */
    orderBy?: UserVocabularyOrderByWithRelationInput | UserVocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserVocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVocabularies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserVocabularies
    **/
    _count?: true | UserVocabularyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserVocabularyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserVocabularySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserVocabularyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserVocabularyMaxAggregateInputType
  }

  export type GetUserVocabularyAggregateType<T extends UserVocabularyAggregateArgs> = {
        [P in keyof T & keyof AggregateUserVocabulary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserVocabulary[P]>
      : GetScalarType<T[P], AggregateUserVocabulary[P]>
  }




  export type UserVocabularyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserVocabularyWhereInput
    orderBy?: UserVocabularyOrderByWithAggregationInput | UserVocabularyOrderByWithAggregationInput[]
    by: UserVocabularyScalarFieldEnum[] | UserVocabularyScalarFieldEnum
    having?: UserVocabularyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserVocabularyCountAggregateInputType | true
    _avg?: UserVocabularyAvgAggregateInputType
    _sum?: UserVocabularySumAggregateInputType
    _min?: UserVocabularyMinAggregateInputType
    _max?: UserVocabularyMaxAggregateInputType
  }

  export type UserVocabularyGroupByOutputType = {
    id: number
    userId: number
    publicVocabularyId: number
    addedAt: Date
    familiarity: number
    personalNote: string | null
    customDefinition: string | null
    customExample: string | null
    _count: UserVocabularyCountAggregateOutputType | null
    _avg: UserVocabularyAvgAggregateOutputType | null
    _sum: UserVocabularySumAggregateOutputType | null
    _min: UserVocabularyMinAggregateOutputType | null
    _max: UserVocabularyMaxAggregateOutputType | null
  }

  type GetUserVocabularyGroupByPayload<T extends UserVocabularyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserVocabularyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserVocabularyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserVocabularyGroupByOutputType[P]>
            : GetScalarType<T[P], UserVocabularyGroupByOutputType[P]>
        }
      >
    >


  export type UserVocabularySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    publicVocabularyId?: boolean
    addedAt?: boolean
    familiarity?: boolean
    personalNote?: boolean
    customDefinition?: boolean
    customExample?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicVocabulary?: boolean | PublicVocabularyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userVocabulary"]>

  export type UserVocabularySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    publicVocabularyId?: boolean
    addedAt?: boolean
    familiarity?: boolean
    personalNote?: boolean
    customDefinition?: boolean
    customExample?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicVocabulary?: boolean | PublicVocabularyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userVocabulary"]>

  export type UserVocabularySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    publicVocabularyId?: boolean
    addedAt?: boolean
    familiarity?: boolean
    personalNote?: boolean
    customDefinition?: boolean
    customExample?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicVocabulary?: boolean | PublicVocabularyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userVocabulary"]>

  export type UserVocabularySelectScalar = {
    id?: boolean
    userId?: boolean
    publicVocabularyId?: boolean
    addedAt?: boolean
    familiarity?: boolean
    personalNote?: boolean
    customDefinition?: boolean
    customExample?: boolean
  }

  export type UserVocabularyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "publicVocabularyId" | "addedAt" | "familiarity" | "personalNote" | "customDefinition" | "customExample", ExtArgs["result"]["userVocabulary"]>
  export type UserVocabularyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicVocabulary?: boolean | PublicVocabularyDefaultArgs<ExtArgs>
  }
  export type UserVocabularyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicVocabulary?: boolean | PublicVocabularyDefaultArgs<ExtArgs>
  }
  export type UserVocabularyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicVocabulary?: boolean | PublicVocabularyDefaultArgs<ExtArgs>
  }

  export type $UserVocabularyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserVocabulary"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      publicVocabulary: Prisma.$PublicVocabularyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      publicVocabularyId: number
      addedAt: Date
      familiarity: number
      personalNote: string | null
      customDefinition: string | null
      customExample: string | null
    }, ExtArgs["result"]["userVocabulary"]>
    composites: {}
  }

  type UserVocabularyGetPayload<S extends boolean | null | undefined | UserVocabularyDefaultArgs> = $Result.GetResult<Prisma.$UserVocabularyPayload, S>

  type UserVocabularyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserVocabularyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserVocabularyCountAggregateInputType | true
    }

  export interface UserVocabularyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserVocabulary'], meta: { name: 'UserVocabulary' } }
    /**
     * Find zero or one UserVocabulary that matches the filter.
     * @param {UserVocabularyFindUniqueArgs} args - Arguments to find a UserVocabulary
     * @example
     * // Get one UserVocabulary
     * const userVocabulary = await prisma.userVocabulary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserVocabularyFindUniqueArgs>(args: SelectSubset<T, UserVocabularyFindUniqueArgs<ExtArgs>>): Prisma__UserVocabularyClient<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserVocabulary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserVocabularyFindUniqueOrThrowArgs} args - Arguments to find a UserVocabulary
     * @example
     * // Get one UserVocabulary
     * const userVocabulary = await prisma.userVocabulary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserVocabularyFindUniqueOrThrowArgs>(args: SelectSubset<T, UserVocabularyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserVocabularyClient<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserVocabulary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabularyFindFirstArgs} args - Arguments to find a UserVocabulary
     * @example
     * // Get one UserVocabulary
     * const userVocabulary = await prisma.userVocabulary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserVocabularyFindFirstArgs>(args?: SelectSubset<T, UserVocabularyFindFirstArgs<ExtArgs>>): Prisma__UserVocabularyClient<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserVocabulary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabularyFindFirstOrThrowArgs} args - Arguments to find a UserVocabulary
     * @example
     * // Get one UserVocabulary
     * const userVocabulary = await prisma.userVocabulary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserVocabularyFindFirstOrThrowArgs>(args?: SelectSubset<T, UserVocabularyFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserVocabularyClient<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserVocabularies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabularyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserVocabularies
     * const userVocabularies = await prisma.userVocabulary.findMany()
     * 
     * // Get first 10 UserVocabularies
     * const userVocabularies = await prisma.userVocabulary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userVocabularyWithIdOnly = await prisma.userVocabulary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserVocabularyFindManyArgs>(args?: SelectSubset<T, UserVocabularyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserVocabulary.
     * @param {UserVocabularyCreateArgs} args - Arguments to create a UserVocabulary.
     * @example
     * // Create one UserVocabulary
     * const UserVocabulary = await prisma.userVocabulary.create({
     *   data: {
     *     // ... data to create a UserVocabulary
     *   }
     * })
     * 
     */
    create<T extends UserVocabularyCreateArgs>(args: SelectSubset<T, UserVocabularyCreateArgs<ExtArgs>>): Prisma__UserVocabularyClient<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserVocabularies.
     * @param {UserVocabularyCreateManyArgs} args - Arguments to create many UserVocabularies.
     * @example
     * // Create many UserVocabularies
     * const userVocabulary = await prisma.userVocabulary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserVocabularyCreateManyArgs>(args?: SelectSubset<T, UserVocabularyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserVocabularies and returns the data saved in the database.
     * @param {UserVocabularyCreateManyAndReturnArgs} args - Arguments to create many UserVocabularies.
     * @example
     * // Create many UserVocabularies
     * const userVocabulary = await prisma.userVocabulary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserVocabularies and only return the `id`
     * const userVocabularyWithIdOnly = await prisma.userVocabulary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserVocabularyCreateManyAndReturnArgs>(args?: SelectSubset<T, UserVocabularyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserVocabulary.
     * @param {UserVocabularyDeleteArgs} args - Arguments to delete one UserVocabulary.
     * @example
     * // Delete one UserVocabulary
     * const UserVocabulary = await prisma.userVocabulary.delete({
     *   where: {
     *     // ... filter to delete one UserVocabulary
     *   }
     * })
     * 
     */
    delete<T extends UserVocabularyDeleteArgs>(args: SelectSubset<T, UserVocabularyDeleteArgs<ExtArgs>>): Prisma__UserVocabularyClient<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserVocabulary.
     * @param {UserVocabularyUpdateArgs} args - Arguments to update one UserVocabulary.
     * @example
     * // Update one UserVocabulary
     * const userVocabulary = await prisma.userVocabulary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserVocabularyUpdateArgs>(args: SelectSubset<T, UserVocabularyUpdateArgs<ExtArgs>>): Prisma__UserVocabularyClient<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserVocabularies.
     * @param {UserVocabularyDeleteManyArgs} args - Arguments to filter UserVocabularies to delete.
     * @example
     * // Delete a few UserVocabularies
     * const { count } = await prisma.userVocabulary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserVocabularyDeleteManyArgs>(args?: SelectSubset<T, UserVocabularyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserVocabularies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabularyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserVocabularies
     * const userVocabulary = await prisma.userVocabulary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserVocabularyUpdateManyArgs>(args: SelectSubset<T, UserVocabularyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserVocabularies and returns the data updated in the database.
     * @param {UserVocabularyUpdateManyAndReturnArgs} args - Arguments to update many UserVocabularies.
     * @example
     * // Update many UserVocabularies
     * const userVocabulary = await prisma.userVocabulary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserVocabularies and only return the `id`
     * const userVocabularyWithIdOnly = await prisma.userVocabulary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserVocabularyUpdateManyAndReturnArgs>(args: SelectSubset<T, UserVocabularyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserVocabulary.
     * @param {UserVocabularyUpsertArgs} args - Arguments to update or create a UserVocabulary.
     * @example
     * // Update or create a UserVocabulary
     * const userVocabulary = await prisma.userVocabulary.upsert({
     *   create: {
     *     // ... data to create a UserVocabulary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserVocabulary we want to update
     *   }
     * })
     */
    upsert<T extends UserVocabularyUpsertArgs>(args: SelectSubset<T, UserVocabularyUpsertArgs<ExtArgs>>): Prisma__UserVocabularyClient<$Result.GetResult<Prisma.$UserVocabularyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserVocabularies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabularyCountArgs} args - Arguments to filter UserVocabularies to count.
     * @example
     * // Count the number of UserVocabularies
     * const count = await prisma.userVocabulary.count({
     *   where: {
     *     // ... the filter for the UserVocabularies we want to count
     *   }
     * })
    **/
    count<T extends UserVocabularyCountArgs>(
      args?: Subset<T, UserVocabularyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserVocabularyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserVocabulary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabularyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserVocabularyAggregateArgs>(args: Subset<T, UserVocabularyAggregateArgs>): Prisma.PrismaPromise<GetUserVocabularyAggregateType<T>>

    /**
     * Group by UserVocabulary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserVocabularyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserVocabularyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserVocabularyGroupByArgs['orderBy'] }
        : { orderBy?: UserVocabularyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserVocabularyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserVocabularyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserVocabulary model
   */
  readonly fields: UserVocabularyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserVocabulary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserVocabularyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    publicVocabulary<T extends PublicVocabularyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PublicVocabularyDefaultArgs<ExtArgs>>): Prisma__PublicVocabularyClient<$Result.GetResult<Prisma.$PublicVocabularyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserVocabulary model
   */
  interface UserVocabularyFieldRefs {
    readonly id: FieldRef<"UserVocabulary", 'Int'>
    readonly userId: FieldRef<"UserVocabulary", 'Int'>
    readonly publicVocabularyId: FieldRef<"UserVocabulary", 'Int'>
    readonly addedAt: FieldRef<"UserVocabulary", 'DateTime'>
    readonly familiarity: FieldRef<"UserVocabulary", 'Int'>
    readonly personalNote: FieldRef<"UserVocabulary", 'String'>
    readonly customDefinition: FieldRef<"UserVocabulary", 'String'>
    readonly customExample: FieldRef<"UserVocabulary", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserVocabulary findUnique
   */
  export type UserVocabularyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    /**
     * Filter, which UserVocabulary to fetch.
     */
    where: UserVocabularyWhereUniqueInput
  }

  /**
   * UserVocabulary findUniqueOrThrow
   */
  export type UserVocabularyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    /**
     * Filter, which UserVocabulary to fetch.
     */
    where: UserVocabularyWhereUniqueInput
  }

  /**
   * UserVocabulary findFirst
   */
  export type UserVocabularyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    /**
     * Filter, which UserVocabulary to fetch.
     */
    where?: UserVocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVocabularies to fetch.
     */
    orderBy?: UserVocabularyOrderByWithRelationInput | UserVocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserVocabularies.
     */
    cursor?: UserVocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVocabularies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserVocabularies.
     */
    distinct?: UserVocabularyScalarFieldEnum | UserVocabularyScalarFieldEnum[]
  }

  /**
   * UserVocabulary findFirstOrThrow
   */
  export type UserVocabularyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    /**
     * Filter, which UserVocabulary to fetch.
     */
    where?: UserVocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVocabularies to fetch.
     */
    orderBy?: UserVocabularyOrderByWithRelationInput | UserVocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserVocabularies.
     */
    cursor?: UserVocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVocabularies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserVocabularies.
     */
    distinct?: UserVocabularyScalarFieldEnum | UserVocabularyScalarFieldEnum[]
  }

  /**
   * UserVocabulary findMany
   */
  export type UserVocabularyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    /**
     * Filter, which UserVocabularies to fetch.
     */
    where?: UserVocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserVocabularies to fetch.
     */
    orderBy?: UserVocabularyOrderByWithRelationInput | UserVocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserVocabularies.
     */
    cursor?: UserVocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserVocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserVocabularies.
     */
    skip?: number
    distinct?: UserVocabularyScalarFieldEnum | UserVocabularyScalarFieldEnum[]
  }

  /**
   * UserVocabulary create
   */
  export type UserVocabularyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    /**
     * The data needed to create a UserVocabulary.
     */
    data: XOR<UserVocabularyCreateInput, UserVocabularyUncheckedCreateInput>
  }

  /**
   * UserVocabulary createMany
   */
  export type UserVocabularyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserVocabularies.
     */
    data: UserVocabularyCreateManyInput | UserVocabularyCreateManyInput[]
  }

  /**
   * UserVocabulary createManyAndReturn
   */
  export type UserVocabularyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * The data used to create many UserVocabularies.
     */
    data: UserVocabularyCreateManyInput | UserVocabularyCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserVocabulary update
   */
  export type UserVocabularyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    /**
     * The data needed to update a UserVocabulary.
     */
    data: XOR<UserVocabularyUpdateInput, UserVocabularyUncheckedUpdateInput>
    /**
     * Choose, which UserVocabulary to update.
     */
    where: UserVocabularyWhereUniqueInput
  }

  /**
   * UserVocabulary updateMany
   */
  export type UserVocabularyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserVocabularies.
     */
    data: XOR<UserVocabularyUpdateManyMutationInput, UserVocabularyUncheckedUpdateManyInput>
    /**
     * Filter which UserVocabularies to update
     */
    where?: UserVocabularyWhereInput
    /**
     * Limit how many UserVocabularies to update.
     */
    limit?: number
  }

  /**
   * UserVocabulary updateManyAndReturn
   */
  export type UserVocabularyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * The data used to update UserVocabularies.
     */
    data: XOR<UserVocabularyUpdateManyMutationInput, UserVocabularyUncheckedUpdateManyInput>
    /**
     * Filter which UserVocabularies to update
     */
    where?: UserVocabularyWhereInput
    /**
     * Limit how many UserVocabularies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserVocabulary upsert
   */
  export type UserVocabularyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    /**
     * The filter to search for the UserVocabulary to update in case it exists.
     */
    where: UserVocabularyWhereUniqueInput
    /**
     * In case the UserVocabulary found by the `where` argument doesn't exist, create a new UserVocabulary with this data.
     */
    create: XOR<UserVocabularyCreateInput, UserVocabularyUncheckedCreateInput>
    /**
     * In case the UserVocabulary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserVocabularyUpdateInput, UserVocabularyUncheckedUpdateInput>
  }

  /**
   * UserVocabulary delete
   */
  export type UserVocabularyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
    /**
     * Filter which UserVocabulary to delete.
     */
    where: UserVocabularyWhereUniqueInput
  }

  /**
   * UserVocabulary deleteMany
   */
  export type UserVocabularyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserVocabularies to delete
     */
    where?: UserVocabularyWhereInput
    /**
     * Limit how many UserVocabularies to delete.
     */
    limit?: number
  }

  /**
   * UserVocabulary without action
   */
  export type UserVocabularyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserVocabulary
     */
    select?: UserVocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserVocabulary
     */
    omit?: UserVocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserVocabularyInclude<ExtArgs> | null
  }


  /**
   * Model UserArticle
   */

  export type AggregateUserArticle = {
    _count: UserArticleCountAggregateOutputType | null
    _avg: UserArticleAvgAggregateOutputType | null
    _sum: UserArticleSumAggregateOutputType | null
    _min: UserArticleMinAggregateOutputType | null
    _max: UserArticleMaxAggregateOutputType | null
  }

  export type UserArticleAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    publicArticleId: number | null
  }

  export type UserArticleSumAggregateOutputType = {
    id: number | null
    userId: number | null
    publicArticleId: number | null
  }

  export type UserArticleMinAggregateOutputType = {
    id: number | null
    userId: number | null
    publicArticleId: number | null
    savedAt: Date | null
  }

  export type UserArticleMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    publicArticleId: number | null
    savedAt: Date | null
  }

  export type UserArticleCountAggregateOutputType = {
    id: number
    userId: number
    publicArticleId: number
    savedAt: number
    _all: number
  }


  export type UserArticleAvgAggregateInputType = {
    id?: true
    userId?: true
    publicArticleId?: true
  }

  export type UserArticleSumAggregateInputType = {
    id?: true
    userId?: true
    publicArticleId?: true
  }

  export type UserArticleMinAggregateInputType = {
    id?: true
    userId?: true
    publicArticleId?: true
    savedAt?: true
  }

  export type UserArticleMaxAggregateInputType = {
    id?: true
    userId?: true
    publicArticleId?: true
    savedAt?: true
  }

  export type UserArticleCountAggregateInputType = {
    id?: true
    userId?: true
    publicArticleId?: true
    savedAt?: true
    _all?: true
  }

  export type UserArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserArticle to aggregate.
     */
    where?: UserArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserArticles to fetch.
     */
    orderBy?: UserArticleOrderByWithRelationInput | UserArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserArticles
    **/
    _count?: true | UserArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserArticleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserArticleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserArticleMaxAggregateInputType
  }

  export type GetUserArticleAggregateType<T extends UserArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserArticle[P]>
      : GetScalarType<T[P], AggregateUserArticle[P]>
  }




  export type UserArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserArticleWhereInput
    orderBy?: UserArticleOrderByWithAggregationInput | UserArticleOrderByWithAggregationInput[]
    by: UserArticleScalarFieldEnum[] | UserArticleScalarFieldEnum
    having?: UserArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserArticleCountAggregateInputType | true
    _avg?: UserArticleAvgAggregateInputType
    _sum?: UserArticleSumAggregateInputType
    _min?: UserArticleMinAggregateInputType
    _max?: UserArticleMaxAggregateInputType
  }

  export type UserArticleGroupByOutputType = {
    id: number
    userId: number
    publicArticleId: number
    savedAt: Date
    _count: UserArticleCountAggregateOutputType | null
    _avg: UserArticleAvgAggregateOutputType | null
    _sum: UserArticleSumAggregateOutputType | null
    _min: UserArticleMinAggregateOutputType | null
    _max: UserArticleMaxAggregateOutputType | null
  }

  type GetUserArticleGroupByPayload<T extends UserArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserArticleGroupByOutputType[P]>
            : GetScalarType<T[P], UserArticleGroupByOutputType[P]>
        }
      >
    >


  export type UserArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    publicArticleId?: boolean
    savedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicArticle?: boolean | PublicArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userArticle"]>

  export type UserArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    publicArticleId?: boolean
    savedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicArticle?: boolean | PublicArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userArticle"]>

  export type UserArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    publicArticleId?: boolean
    savedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicArticle?: boolean | PublicArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userArticle"]>

  export type UserArticleSelectScalar = {
    id?: boolean
    userId?: boolean
    publicArticleId?: boolean
    savedAt?: boolean
  }

  export type UserArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "publicArticleId" | "savedAt", ExtArgs["result"]["userArticle"]>
  export type UserArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicArticle?: boolean | PublicArticleDefaultArgs<ExtArgs>
  }
  export type UserArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicArticle?: boolean | PublicArticleDefaultArgs<ExtArgs>
  }
  export type UserArticleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    publicArticle?: boolean | PublicArticleDefaultArgs<ExtArgs>
  }

  export type $UserArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserArticle"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      publicArticle: Prisma.$PublicArticlePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      publicArticleId: number
      savedAt: Date
    }, ExtArgs["result"]["userArticle"]>
    composites: {}
  }

  type UserArticleGetPayload<S extends boolean | null | undefined | UserArticleDefaultArgs> = $Result.GetResult<Prisma.$UserArticlePayload, S>

  type UserArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserArticleCountAggregateInputType | true
    }

  export interface UserArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserArticle'], meta: { name: 'UserArticle' } }
    /**
     * Find zero or one UserArticle that matches the filter.
     * @param {UserArticleFindUniqueArgs} args - Arguments to find a UserArticle
     * @example
     * // Get one UserArticle
     * const userArticle = await prisma.userArticle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserArticleFindUniqueArgs>(args: SelectSubset<T, UserArticleFindUniqueArgs<ExtArgs>>): Prisma__UserArticleClient<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserArticle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserArticleFindUniqueOrThrowArgs} args - Arguments to find a UserArticle
     * @example
     * // Get one UserArticle
     * const userArticle = await prisma.userArticle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserArticleClient<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserArticle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArticleFindFirstArgs} args - Arguments to find a UserArticle
     * @example
     * // Get one UserArticle
     * const userArticle = await prisma.userArticle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserArticleFindFirstArgs>(args?: SelectSubset<T, UserArticleFindFirstArgs<ExtArgs>>): Prisma__UserArticleClient<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserArticle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArticleFindFirstOrThrowArgs} args - Arguments to find a UserArticle
     * @example
     * // Get one UserArticle
     * const userArticle = await prisma.userArticle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserArticleClient<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserArticles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserArticles
     * const userArticles = await prisma.userArticle.findMany()
     * 
     * // Get first 10 UserArticles
     * const userArticles = await prisma.userArticle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userArticleWithIdOnly = await prisma.userArticle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserArticleFindManyArgs>(args?: SelectSubset<T, UserArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserArticle.
     * @param {UserArticleCreateArgs} args - Arguments to create a UserArticle.
     * @example
     * // Create one UserArticle
     * const UserArticle = await prisma.userArticle.create({
     *   data: {
     *     // ... data to create a UserArticle
     *   }
     * })
     * 
     */
    create<T extends UserArticleCreateArgs>(args: SelectSubset<T, UserArticleCreateArgs<ExtArgs>>): Prisma__UserArticleClient<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserArticles.
     * @param {UserArticleCreateManyArgs} args - Arguments to create many UserArticles.
     * @example
     * // Create many UserArticles
     * const userArticle = await prisma.userArticle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserArticleCreateManyArgs>(args?: SelectSubset<T, UserArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserArticles and returns the data saved in the database.
     * @param {UserArticleCreateManyAndReturnArgs} args - Arguments to create many UserArticles.
     * @example
     * // Create many UserArticles
     * const userArticle = await prisma.userArticle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserArticles and only return the `id`
     * const userArticleWithIdOnly = await prisma.userArticle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, UserArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserArticle.
     * @param {UserArticleDeleteArgs} args - Arguments to delete one UserArticle.
     * @example
     * // Delete one UserArticle
     * const UserArticle = await prisma.userArticle.delete({
     *   where: {
     *     // ... filter to delete one UserArticle
     *   }
     * })
     * 
     */
    delete<T extends UserArticleDeleteArgs>(args: SelectSubset<T, UserArticleDeleteArgs<ExtArgs>>): Prisma__UserArticleClient<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserArticle.
     * @param {UserArticleUpdateArgs} args - Arguments to update one UserArticle.
     * @example
     * // Update one UserArticle
     * const userArticle = await prisma.userArticle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserArticleUpdateArgs>(args: SelectSubset<T, UserArticleUpdateArgs<ExtArgs>>): Prisma__UserArticleClient<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserArticles.
     * @param {UserArticleDeleteManyArgs} args - Arguments to filter UserArticles to delete.
     * @example
     * // Delete a few UserArticles
     * const { count } = await prisma.userArticle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserArticleDeleteManyArgs>(args?: SelectSubset<T, UserArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserArticles
     * const userArticle = await prisma.userArticle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserArticleUpdateManyArgs>(args: SelectSubset<T, UserArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserArticles and returns the data updated in the database.
     * @param {UserArticleUpdateManyAndReturnArgs} args - Arguments to update many UserArticles.
     * @example
     * // Update many UserArticles
     * const userArticle = await prisma.userArticle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserArticles and only return the `id`
     * const userArticleWithIdOnly = await prisma.userArticle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, UserArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserArticle.
     * @param {UserArticleUpsertArgs} args - Arguments to update or create a UserArticle.
     * @example
     * // Update or create a UserArticle
     * const userArticle = await prisma.userArticle.upsert({
     *   create: {
     *     // ... data to create a UserArticle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserArticle we want to update
     *   }
     * })
     */
    upsert<T extends UserArticleUpsertArgs>(args: SelectSubset<T, UserArticleUpsertArgs<ExtArgs>>): Prisma__UserArticleClient<$Result.GetResult<Prisma.$UserArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArticleCountArgs} args - Arguments to filter UserArticles to count.
     * @example
     * // Count the number of UserArticles
     * const count = await prisma.userArticle.count({
     *   where: {
     *     // ... the filter for the UserArticles we want to count
     *   }
     * })
    **/
    count<T extends UserArticleCountArgs>(
      args?: Subset<T, UserArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserArticleAggregateArgs>(args: Subset<T, UserArticleAggregateArgs>): Prisma.PrismaPromise<GetUserArticleAggregateType<T>>

    /**
     * Group by UserArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserArticleGroupByArgs['orderBy'] }
        : { orderBy?: UserArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserArticle model
   */
  readonly fields: UserArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserArticle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    publicArticle<T extends PublicArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PublicArticleDefaultArgs<ExtArgs>>): Prisma__PublicArticleClient<$Result.GetResult<Prisma.$PublicArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserArticle model
   */
  interface UserArticleFieldRefs {
    readonly id: FieldRef<"UserArticle", 'Int'>
    readonly userId: FieldRef<"UserArticle", 'Int'>
    readonly publicArticleId: FieldRef<"UserArticle", 'Int'>
    readonly savedAt: FieldRef<"UserArticle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserArticle findUnique
   */
  export type UserArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    /**
     * Filter, which UserArticle to fetch.
     */
    where: UserArticleWhereUniqueInput
  }

  /**
   * UserArticle findUniqueOrThrow
   */
  export type UserArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    /**
     * Filter, which UserArticle to fetch.
     */
    where: UserArticleWhereUniqueInput
  }

  /**
   * UserArticle findFirst
   */
  export type UserArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    /**
     * Filter, which UserArticle to fetch.
     */
    where?: UserArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserArticles to fetch.
     */
    orderBy?: UserArticleOrderByWithRelationInput | UserArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserArticles.
     */
    cursor?: UserArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserArticles.
     */
    distinct?: UserArticleScalarFieldEnum | UserArticleScalarFieldEnum[]
  }

  /**
   * UserArticle findFirstOrThrow
   */
  export type UserArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    /**
     * Filter, which UserArticle to fetch.
     */
    where?: UserArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserArticles to fetch.
     */
    orderBy?: UserArticleOrderByWithRelationInput | UserArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserArticles.
     */
    cursor?: UserArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserArticles.
     */
    distinct?: UserArticleScalarFieldEnum | UserArticleScalarFieldEnum[]
  }

  /**
   * UserArticle findMany
   */
  export type UserArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    /**
     * Filter, which UserArticles to fetch.
     */
    where?: UserArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserArticles to fetch.
     */
    orderBy?: UserArticleOrderByWithRelationInput | UserArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserArticles.
     */
    cursor?: UserArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserArticles.
     */
    skip?: number
    distinct?: UserArticleScalarFieldEnum | UserArticleScalarFieldEnum[]
  }

  /**
   * UserArticle create
   */
  export type UserArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserArticle.
     */
    data: XOR<UserArticleCreateInput, UserArticleUncheckedCreateInput>
  }

  /**
   * UserArticle createMany
   */
  export type UserArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserArticles.
     */
    data: UserArticleCreateManyInput | UserArticleCreateManyInput[]
  }

  /**
   * UserArticle createManyAndReturn
   */
  export type UserArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * The data used to create many UserArticles.
     */
    data: UserArticleCreateManyInput | UserArticleCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserArticle update
   */
  export type UserArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserArticle.
     */
    data: XOR<UserArticleUpdateInput, UserArticleUncheckedUpdateInput>
    /**
     * Choose, which UserArticle to update.
     */
    where: UserArticleWhereUniqueInput
  }

  /**
   * UserArticle updateMany
   */
  export type UserArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserArticles.
     */
    data: XOR<UserArticleUpdateManyMutationInput, UserArticleUncheckedUpdateManyInput>
    /**
     * Filter which UserArticles to update
     */
    where?: UserArticleWhereInput
    /**
     * Limit how many UserArticles to update.
     */
    limit?: number
  }

  /**
   * UserArticle updateManyAndReturn
   */
  export type UserArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * The data used to update UserArticles.
     */
    data: XOR<UserArticleUpdateManyMutationInput, UserArticleUncheckedUpdateManyInput>
    /**
     * Filter which UserArticles to update
     */
    where?: UserArticleWhereInput
    /**
     * Limit how many UserArticles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserArticle upsert
   */
  export type UserArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserArticle to update in case it exists.
     */
    where: UserArticleWhereUniqueInput
    /**
     * In case the UserArticle found by the `where` argument doesn't exist, create a new UserArticle with this data.
     */
    create: XOR<UserArticleCreateInput, UserArticleUncheckedCreateInput>
    /**
     * In case the UserArticle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserArticleUpdateInput, UserArticleUncheckedUpdateInput>
  }

  /**
   * UserArticle delete
   */
  export type UserArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
    /**
     * Filter which UserArticle to delete.
     */
    where: UserArticleWhereUniqueInput
  }

  /**
   * UserArticle deleteMany
   */
  export type UserArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserArticles to delete
     */
    where?: UserArticleWhereInput
    /**
     * Limit how many UserArticles to delete.
     */
    limit?: number
  }

  /**
   * UserArticle without action
   */
  export type UserArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArticle
     */
    select?: UserArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArticle
     */
    omit?: UserArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArticleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PublicVocabularyScalarFieldEnum: {
    id: 'id',
    word: 'word',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    partOfSpeech: 'partOfSpeech',
    definition: 'definition',
    localDefinition: 'localDefinition',
    example: 'example',
    exampleTranslation: 'exampleTranslation',
    pronunciation: 'pronunciation',
    synonyms: 'synonyms',
    antonyms: 'antonyms'
  };

  export type PublicVocabularyScalarFieldEnum = (typeof PublicVocabularyScalarFieldEnum)[keyof typeof PublicVocabularyScalarFieldEnum]


  export const PublicArticleScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    content: 'content',
    publishedAt: 'publishedAt',
    updatedAt: 'updatedAt',
    author: 'author',
    coverImage: 'coverImage'
  };

  export type PublicArticleScalarFieldEnum = (typeof PublicArticleScalarFieldEnum)[keyof typeof PublicArticleScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    nativeLanguage: 'nativeLanguage',
    emailVerified: 'emailVerified',
    verificationToken: 'verificationToken',
    resetPasswordToken: 'resetPasswordToken',
    resetPasswordExpires: 'resetPasswordExpires'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserVocabularyScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    publicVocabularyId: 'publicVocabularyId',
    addedAt: 'addedAt',
    familiarity: 'familiarity',
    personalNote: 'personalNote',
    customDefinition: 'customDefinition',
    customExample: 'customExample'
  };

  export type UserVocabularyScalarFieldEnum = (typeof UserVocabularyScalarFieldEnum)[keyof typeof UserVocabularyScalarFieldEnum]


  export const UserArticleScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    publicArticleId: 'publicArticleId',
    savedAt: 'savedAt'
  };

  export type UserArticleScalarFieldEnum = (typeof UserArticleScalarFieldEnum)[keyof typeof UserArticleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type PublicVocabularyWhereInput = {
    AND?: PublicVocabularyWhereInput | PublicVocabularyWhereInput[]
    OR?: PublicVocabularyWhereInput[]
    NOT?: PublicVocabularyWhereInput | PublicVocabularyWhereInput[]
    id?: IntFilter<"PublicVocabulary"> | number
    word?: StringFilter<"PublicVocabulary"> | string
    createdAt?: DateTimeFilter<"PublicVocabulary"> | Date | string
    updatedAt?: DateTimeFilter<"PublicVocabulary"> | Date | string
    partOfSpeech?: StringFilter<"PublicVocabulary"> | string
    definition?: StringFilter<"PublicVocabulary"> | string
    localDefinition?: StringNullableFilter<"PublicVocabulary"> | string | null
    example?: StringNullableFilter<"PublicVocabulary"> | string | null
    exampleTranslation?: StringNullableFilter<"PublicVocabulary"> | string | null
    pronunciation?: StringNullableFilter<"PublicVocabulary"> | string | null
    synonyms?: StringNullableFilter<"PublicVocabulary"> | string | null
    antonyms?: StringNullableFilter<"PublicVocabulary"> | string | null
    userVocabularies?: UserVocabularyListRelationFilter
  }

  export type PublicVocabularyOrderByWithRelationInput = {
    id?: SortOrder
    word?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    partOfSpeech?: SortOrder
    definition?: SortOrder
    localDefinition?: SortOrderInput | SortOrder
    example?: SortOrderInput | SortOrder
    exampleTranslation?: SortOrderInput | SortOrder
    pronunciation?: SortOrderInput | SortOrder
    synonyms?: SortOrderInput | SortOrder
    antonyms?: SortOrderInput | SortOrder
    userVocabularies?: UserVocabularyOrderByRelationAggregateInput
  }

  export type PublicVocabularyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    word?: string
    AND?: PublicVocabularyWhereInput | PublicVocabularyWhereInput[]
    OR?: PublicVocabularyWhereInput[]
    NOT?: PublicVocabularyWhereInput | PublicVocabularyWhereInput[]
    createdAt?: DateTimeFilter<"PublicVocabulary"> | Date | string
    updatedAt?: DateTimeFilter<"PublicVocabulary"> | Date | string
    partOfSpeech?: StringFilter<"PublicVocabulary"> | string
    definition?: StringFilter<"PublicVocabulary"> | string
    localDefinition?: StringNullableFilter<"PublicVocabulary"> | string | null
    example?: StringNullableFilter<"PublicVocabulary"> | string | null
    exampleTranslation?: StringNullableFilter<"PublicVocabulary"> | string | null
    pronunciation?: StringNullableFilter<"PublicVocabulary"> | string | null
    synonyms?: StringNullableFilter<"PublicVocabulary"> | string | null
    antonyms?: StringNullableFilter<"PublicVocabulary"> | string | null
    userVocabularies?: UserVocabularyListRelationFilter
  }, "id" | "word">

  export type PublicVocabularyOrderByWithAggregationInput = {
    id?: SortOrder
    word?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    partOfSpeech?: SortOrder
    definition?: SortOrder
    localDefinition?: SortOrderInput | SortOrder
    example?: SortOrderInput | SortOrder
    exampleTranslation?: SortOrderInput | SortOrder
    pronunciation?: SortOrderInput | SortOrder
    synonyms?: SortOrderInput | SortOrder
    antonyms?: SortOrderInput | SortOrder
    _count?: PublicVocabularyCountOrderByAggregateInput
    _avg?: PublicVocabularyAvgOrderByAggregateInput
    _max?: PublicVocabularyMaxOrderByAggregateInput
    _min?: PublicVocabularyMinOrderByAggregateInput
    _sum?: PublicVocabularySumOrderByAggregateInput
  }

  export type PublicVocabularyScalarWhereWithAggregatesInput = {
    AND?: PublicVocabularyScalarWhereWithAggregatesInput | PublicVocabularyScalarWhereWithAggregatesInput[]
    OR?: PublicVocabularyScalarWhereWithAggregatesInput[]
    NOT?: PublicVocabularyScalarWhereWithAggregatesInput | PublicVocabularyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PublicVocabulary"> | number
    word?: StringWithAggregatesFilter<"PublicVocabulary"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PublicVocabulary"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PublicVocabulary"> | Date | string
    partOfSpeech?: StringWithAggregatesFilter<"PublicVocabulary"> | string
    definition?: StringWithAggregatesFilter<"PublicVocabulary"> | string
    localDefinition?: StringNullableWithAggregatesFilter<"PublicVocabulary"> | string | null
    example?: StringNullableWithAggregatesFilter<"PublicVocabulary"> | string | null
    exampleTranslation?: StringNullableWithAggregatesFilter<"PublicVocabulary"> | string | null
    pronunciation?: StringNullableWithAggregatesFilter<"PublicVocabulary"> | string | null
    synonyms?: StringNullableWithAggregatesFilter<"PublicVocabulary"> | string | null
    antonyms?: StringNullableWithAggregatesFilter<"PublicVocabulary"> | string | null
  }

  export type PublicArticleWhereInput = {
    AND?: PublicArticleWhereInput | PublicArticleWhereInput[]
    OR?: PublicArticleWhereInput[]
    NOT?: PublicArticleWhereInput | PublicArticleWhereInput[]
    id?: IntFilter<"PublicArticle"> | number
    slug?: StringFilter<"PublicArticle"> | string
    title?: StringFilter<"PublicArticle"> | string
    content?: StringFilter<"PublicArticle"> | string
    publishedAt?: DateTimeFilter<"PublicArticle"> | Date | string
    updatedAt?: DateTimeFilter<"PublicArticle"> | Date | string
    author?: StringNullableFilter<"PublicArticle"> | string | null
    coverImage?: StringNullableFilter<"PublicArticle"> | string | null
    userArticles?: UserArticleListRelationFilter
  }

  export type PublicArticleOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
    author?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    userArticles?: UserArticleOrderByRelationAggregateInput
  }

  export type PublicArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: PublicArticleWhereInput | PublicArticleWhereInput[]
    OR?: PublicArticleWhereInput[]
    NOT?: PublicArticleWhereInput | PublicArticleWhereInput[]
    title?: StringFilter<"PublicArticle"> | string
    content?: StringFilter<"PublicArticle"> | string
    publishedAt?: DateTimeFilter<"PublicArticle"> | Date | string
    updatedAt?: DateTimeFilter<"PublicArticle"> | Date | string
    author?: StringNullableFilter<"PublicArticle"> | string | null
    coverImage?: StringNullableFilter<"PublicArticle"> | string | null
    userArticles?: UserArticleListRelationFilter
  }, "id" | "slug">

  export type PublicArticleOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
    author?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    _count?: PublicArticleCountOrderByAggregateInput
    _avg?: PublicArticleAvgOrderByAggregateInput
    _max?: PublicArticleMaxOrderByAggregateInput
    _min?: PublicArticleMinOrderByAggregateInput
    _sum?: PublicArticleSumOrderByAggregateInput
  }

  export type PublicArticleScalarWhereWithAggregatesInput = {
    AND?: PublicArticleScalarWhereWithAggregatesInput | PublicArticleScalarWhereWithAggregatesInput[]
    OR?: PublicArticleScalarWhereWithAggregatesInput[]
    NOT?: PublicArticleScalarWhereWithAggregatesInput | PublicArticleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PublicArticle"> | number
    slug?: StringWithAggregatesFilter<"PublicArticle"> | string
    title?: StringWithAggregatesFilter<"PublicArticle"> | string
    content?: StringWithAggregatesFilter<"PublicArticle"> | string
    publishedAt?: DateTimeWithAggregatesFilter<"PublicArticle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PublicArticle"> | Date | string
    author?: StringNullableWithAggregatesFilter<"PublicArticle"> | string | null
    coverImage?: StringNullableWithAggregatesFilter<"PublicArticle"> | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    nativeLanguage?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    userVocabularies?: UserVocabularyListRelationFilter
    userArticles?: UserArticleListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    nativeLanguage?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    resetPasswordToken?: SortOrderInput | SortOrder
    resetPasswordExpires?: SortOrderInput | SortOrder
    userVocabularies?: UserVocabularyOrderByRelationAggregateInput
    userArticles?: UserArticleOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    nativeLanguage?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    userVocabularies?: UserVocabularyListRelationFilter
    userArticles?: UserArticleListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    nativeLanguage?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    resetPasswordToken?: SortOrderInput | SortOrder
    resetPasswordExpires?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    nativeLanguage?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    verificationToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetPasswordToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type UserVocabularyWhereInput = {
    AND?: UserVocabularyWhereInput | UserVocabularyWhereInput[]
    OR?: UserVocabularyWhereInput[]
    NOT?: UserVocabularyWhereInput | UserVocabularyWhereInput[]
    id?: IntFilter<"UserVocabulary"> | number
    userId?: IntFilter<"UserVocabulary"> | number
    publicVocabularyId?: IntFilter<"UserVocabulary"> | number
    addedAt?: DateTimeFilter<"UserVocabulary"> | Date | string
    familiarity?: IntFilter<"UserVocabulary"> | number
    personalNote?: StringNullableFilter<"UserVocabulary"> | string | null
    customDefinition?: StringNullableFilter<"UserVocabulary"> | string | null
    customExample?: StringNullableFilter<"UserVocabulary"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    publicVocabulary?: XOR<PublicVocabularyScalarRelationFilter, PublicVocabularyWhereInput>
  }

  export type UserVocabularyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    publicVocabularyId?: SortOrder
    addedAt?: SortOrder
    familiarity?: SortOrder
    personalNote?: SortOrderInput | SortOrder
    customDefinition?: SortOrderInput | SortOrder
    customExample?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    publicVocabulary?: PublicVocabularyOrderByWithRelationInput
  }

  export type UserVocabularyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_publicVocabularyId?: UserVocabularyUserIdPublicVocabularyIdCompoundUniqueInput
    AND?: UserVocabularyWhereInput | UserVocabularyWhereInput[]
    OR?: UserVocabularyWhereInput[]
    NOT?: UserVocabularyWhereInput | UserVocabularyWhereInput[]
    userId?: IntFilter<"UserVocabulary"> | number
    publicVocabularyId?: IntFilter<"UserVocabulary"> | number
    addedAt?: DateTimeFilter<"UserVocabulary"> | Date | string
    familiarity?: IntFilter<"UserVocabulary"> | number
    personalNote?: StringNullableFilter<"UserVocabulary"> | string | null
    customDefinition?: StringNullableFilter<"UserVocabulary"> | string | null
    customExample?: StringNullableFilter<"UserVocabulary"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    publicVocabulary?: XOR<PublicVocabularyScalarRelationFilter, PublicVocabularyWhereInput>
  }, "id" | "userId_publicVocabularyId">

  export type UserVocabularyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    publicVocabularyId?: SortOrder
    addedAt?: SortOrder
    familiarity?: SortOrder
    personalNote?: SortOrderInput | SortOrder
    customDefinition?: SortOrderInput | SortOrder
    customExample?: SortOrderInput | SortOrder
    _count?: UserVocabularyCountOrderByAggregateInput
    _avg?: UserVocabularyAvgOrderByAggregateInput
    _max?: UserVocabularyMaxOrderByAggregateInput
    _min?: UserVocabularyMinOrderByAggregateInput
    _sum?: UserVocabularySumOrderByAggregateInput
  }

  export type UserVocabularyScalarWhereWithAggregatesInput = {
    AND?: UserVocabularyScalarWhereWithAggregatesInput | UserVocabularyScalarWhereWithAggregatesInput[]
    OR?: UserVocabularyScalarWhereWithAggregatesInput[]
    NOT?: UserVocabularyScalarWhereWithAggregatesInput | UserVocabularyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserVocabulary"> | number
    userId?: IntWithAggregatesFilter<"UserVocabulary"> | number
    publicVocabularyId?: IntWithAggregatesFilter<"UserVocabulary"> | number
    addedAt?: DateTimeWithAggregatesFilter<"UserVocabulary"> | Date | string
    familiarity?: IntWithAggregatesFilter<"UserVocabulary"> | number
    personalNote?: StringNullableWithAggregatesFilter<"UserVocabulary"> | string | null
    customDefinition?: StringNullableWithAggregatesFilter<"UserVocabulary"> | string | null
    customExample?: StringNullableWithAggregatesFilter<"UserVocabulary"> | string | null
  }

  export type UserArticleWhereInput = {
    AND?: UserArticleWhereInput | UserArticleWhereInput[]
    OR?: UserArticleWhereInput[]
    NOT?: UserArticleWhereInput | UserArticleWhereInput[]
    id?: IntFilter<"UserArticle"> | number
    userId?: IntFilter<"UserArticle"> | number
    publicArticleId?: IntFilter<"UserArticle"> | number
    savedAt?: DateTimeFilter<"UserArticle"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    publicArticle?: XOR<PublicArticleScalarRelationFilter, PublicArticleWhereInput>
  }

  export type UserArticleOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    publicArticleId?: SortOrder
    savedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    publicArticle?: PublicArticleOrderByWithRelationInput
  }

  export type UserArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_publicArticleId?: UserArticleUserIdPublicArticleIdCompoundUniqueInput
    AND?: UserArticleWhereInput | UserArticleWhereInput[]
    OR?: UserArticleWhereInput[]
    NOT?: UserArticleWhereInput | UserArticleWhereInput[]
    userId?: IntFilter<"UserArticle"> | number
    publicArticleId?: IntFilter<"UserArticle"> | number
    savedAt?: DateTimeFilter<"UserArticle"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    publicArticle?: XOR<PublicArticleScalarRelationFilter, PublicArticleWhereInput>
  }, "id" | "userId_publicArticleId">

  export type UserArticleOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    publicArticleId?: SortOrder
    savedAt?: SortOrder
    _count?: UserArticleCountOrderByAggregateInput
    _avg?: UserArticleAvgOrderByAggregateInput
    _max?: UserArticleMaxOrderByAggregateInput
    _min?: UserArticleMinOrderByAggregateInput
    _sum?: UserArticleSumOrderByAggregateInput
  }

  export type UserArticleScalarWhereWithAggregatesInput = {
    AND?: UserArticleScalarWhereWithAggregatesInput | UserArticleScalarWhereWithAggregatesInput[]
    OR?: UserArticleScalarWhereWithAggregatesInput[]
    NOT?: UserArticleScalarWhereWithAggregatesInput | UserArticleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserArticle"> | number
    userId?: IntWithAggregatesFilter<"UserArticle"> | number
    publicArticleId?: IntWithAggregatesFilter<"UserArticle"> | number
    savedAt?: DateTimeWithAggregatesFilter<"UserArticle"> | Date | string
  }

  export type PublicVocabularyCreateInput = {
    word: string
    createdAt?: Date | string
    updatedAt?: Date | string
    partOfSpeech: string
    definition: string
    localDefinition?: string | null
    example?: string | null
    exampleTranslation?: string | null
    pronunciation?: string | null
    synonyms?: string | null
    antonyms?: string | null
    userVocabularies?: UserVocabularyCreateNestedManyWithoutPublicVocabularyInput
  }

  export type PublicVocabularyUncheckedCreateInput = {
    id?: number
    word: string
    createdAt?: Date | string
    updatedAt?: Date | string
    partOfSpeech: string
    definition: string
    localDefinition?: string | null
    example?: string | null
    exampleTranslation?: string | null
    pronunciation?: string | null
    synonyms?: string | null
    antonyms?: string | null
    userVocabularies?: UserVocabularyUncheckedCreateNestedManyWithoutPublicVocabularyInput
  }

  export type PublicVocabularyUpdateInput = {
    word?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partOfSpeech?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    localDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    synonyms?: NullableStringFieldUpdateOperationsInput | string | null
    antonyms?: NullableStringFieldUpdateOperationsInput | string | null
    userVocabularies?: UserVocabularyUpdateManyWithoutPublicVocabularyNestedInput
  }

  export type PublicVocabularyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partOfSpeech?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    localDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    synonyms?: NullableStringFieldUpdateOperationsInput | string | null
    antonyms?: NullableStringFieldUpdateOperationsInput | string | null
    userVocabularies?: UserVocabularyUncheckedUpdateManyWithoutPublicVocabularyNestedInput
  }

  export type PublicVocabularyCreateManyInput = {
    id?: number
    word: string
    createdAt?: Date | string
    updatedAt?: Date | string
    partOfSpeech: string
    definition: string
    localDefinition?: string | null
    example?: string | null
    exampleTranslation?: string | null
    pronunciation?: string | null
    synonyms?: string | null
    antonyms?: string | null
  }

  export type PublicVocabularyUpdateManyMutationInput = {
    word?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partOfSpeech?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    localDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    synonyms?: NullableStringFieldUpdateOperationsInput | string | null
    antonyms?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicVocabularyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partOfSpeech?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    localDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    synonyms?: NullableStringFieldUpdateOperationsInput | string | null
    antonyms?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicArticleCreateInput = {
    slug: string
    title: string
    content: string
    publishedAt?: Date | string
    updatedAt?: Date | string
    author?: string | null
    coverImage?: string | null
    userArticles?: UserArticleCreateNestedManyWithoutPublicArticleInput
  }

  export type PublicArticleUncheckedCreateInput = {
    id?: number
    slug: string
    title: string
    content: string
    publishedAt?: Date | string
    updatedAt?: Date | string
    author?: string | null
    coverImage?: string | null
    userArticles?: UserArticleUncheckedCreateNestedManyWithoutPublicArticleInput
  }

  export type PublicArticleUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    userArticles?: UserArticleUpdateManyWithoutPublicArticleNestedInput
  }

  export type PublicArticleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    userArticles?: UserArticleUncheckedUpdateManyWithoutPublicArticleNestedInput
  }

  export type PublicArticleCreateManyInput = {
    id?: number
    slug: string
    title: string
    content: string
    publishedAt?: Date | string
    updatedAt?: Date | string
    author?: string | null
    coverImage?: string | null
  }

  export type PublicArticleUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicArticleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    nativeLanguage?: string | null
    emailVerified?: boolean
    verificationToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    userVocabularies?: UserVocabularyCreateNestedManyWithoutUserInput
    userArticles?: UserArticleCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    nativeLanguage?: string | null
    emailVerified?: boolean
    verificationToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    userVocabularies?: UserVocabularyUncheckedCreateNestedManyWithoutUserInput
    userArticles?: UserArticleUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nativeLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userVocabularies?: UserVocabularyUpdateManyWithoutUserNestedInput
    userArticles?: UserArticleUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nativeLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userVocabularies?: UserVocabularyUncheckedUpdateManyWithoutUserNestedInput
    userArticles?: UserArticleUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    nativeLanguage?: string | null
    emailVerified?: boolean
    verificationToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nativeLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nativeLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserVocabularyCreateInput = {
    addedAt?: Date | string
    familiarity?: number
    personalNote?: string | null
    customDefinition?: string | null
    customExample?: string | null
    user: UserCreateNestedOneWithoutUserVocabulariesInput
    publicVocabulary: PublicVocabularyCreateNestedOneWithoutUserVocabulariesInput
  }

  export type UserVocabularyUncheckedCreateInput = {
    id?: number
    userId: number
    publicVocabularyId: number
    addedAt?: Date | string
    familiarity?: number
    personalNote?: string | null
    customDefinition?: string | null
    customExample?: string | null
  }

  export type UserVocabularyUpdateInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familiarity?: IntFieldUpdateOperationsInput | number
    personalNote?: NullableStringFieldUpdateOperationsInput | string | null
    customDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    customExample?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutUserVocabulariesNestedInput
    publicVocabulary?: PublicVocabularyUpdateOneRequiredWithoutUserVocabulariesNestedInput
  }

  export type UserVocabularyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    publicVocabularyId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familiarity?: IntFieldUpdateOperationsInput | number
    personalNote?: NullableStringFieldUpdateOperationsInput | string | null
    customDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    customExample?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserVocabularyCreateManyInput = {
    id?: number
    userId: number
    publicVocabularyId: number
    addedAt?: Date | string
    familiarity?: number
    personalNote?: string | null
    customDefinition?: string | null
    customExample?: string | null
  }

  export type UserVocabularyUpdateManyMutationInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familiarity?: IntFieldUpdateOperationsInput | number
    personalNote?: NullableStringFieldUpdateOperationsInput | string | null
    customDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    customExample?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserVocabularyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    publicVocabularyId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familiarity?: IntFieldUpdateOperationsInput | number
    personalNote?: NullableStringFieldUpdateOperationsInput | string | null
    customDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    customExample?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserArticleCreateInput = {
    savedAt?: Date | string
    user: UserCreateNestedOneWithoutUserArticlesInput
    publicArticle: PublicArticleCreateNestedOneWithoutUserArticlesInput
  }

  export type UserArticleUncheckedCreateInput = {
    id?: number
    userId: number
    publicArticleId: number
    savedAt?: Date | string
  }

  export type UserArticleUpdateInput = {
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserArticlesNestedInput
    publicArticle?: PublicArticleUpdateOneRequiredWithoutUserArticlesNestedInput
  }

  export type UserArticleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    publicArticleId?: IntFieldUpdateOperationsInput | number
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArticleCreateManyInput = {
    id?: number
    userId: number
    publicArticleId: number
    savedAt?: Date | string
  }

  export type UserArticleUpdateManyMutationInput = {
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArticleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    publicArticleId?: IntFieldUpdateOperationsInput | number
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserVocabularyListRelationFilter = {
    every?: UserVocabularyWhereInput
    some?: UserVocabularyWhereInput
    none?: UserVocabularyWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserVocabularyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PublicVocabularyCountOrderByAggregateInput = {
    id?: SortOrder
    word?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    partOfSpeech?: SortOrder
    definition?: SortOrder
    localDefinition?: SortOrder
    example?: SortOrder
    exampleTranslation?: SortOrder
    pronunciation?: SortOrder
    synonyms?: SortOrder
    antonyms?: SortOrder
  }

  export type PublicVocabularyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PublicVocabularyMaxOrderByAggregateInput = {
    id?: SortOrder
    word?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    partOfSpeech?: SortOrder
    definition?: SortOrder
    localDefinition?: SortOrder
    example?: SortOrder
    exampleTranslation?: SortOrder
    pronunciation?: SortOrder
    synonyms?: SortOrder
    antonyms?: SortOrder
  }

  export type PublicVocabularyMinOrderByAggregateInput = {
    id?: SortOrder
    word?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    partOfSpeech?: SortOrder
    definition?: SortOrder
    localDefinition?: SortOrder
    example?: SortOrder
    exampleTranslation?: SortOrder
    pronunciation?: SortOrder
    synonyms?: SortOrder
    antonyms?: SortOrder
  }

  export type PublicVocabularySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserArticleListRelationFilter = {
    every?: UserArticleWhereInput
    some?: UserArticleWhereInput
    none?: UserArticleWhereInput
  }

  export type UserArticleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PublicArticleCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
    author?: SortOrder
    coverImage?: SortOrder
  }

  export type PublicArticleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PublicArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
    author?: SortOrder
    coverImage?: SortOrder
  }

  export type PublicArticleMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
    author?: SortOrder
    coverImage?: SortOrder
  }

  export type PublicArticleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    nativeLanguage?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    nativeLanguage?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    nativeLanguage?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PublicVocabularyScalarRelationFilter = {
    is?: PublicVocabularyWhereInput
    isNot?: PublicVocabularyWhereInput
  }

  export type UserVocabularyUserIdPublicVocabularyIdCompoundUniqueInput = {
    userId: number
    publicVocabularyId: number
  }

  export type UserVocabularyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    publicVocabularyId?: SortOrder
    addedAt?: SortOrder
    familiarity?: SortOrder
    personalNote?: SortOrder
    customDefinition?: SortOrder
    customExample?: SortOrder
  }

  export type UserVocabularyAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    publicVocabularyId?: SortOrder
    familiarity?: SortOrder
  }

  export type UserVocabularyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    publicVocabularyId?: SortOrder
    addedAt?: SortOrder
    familiarity?: SortOrder
    personalNote?: SortOrder
    customDefinition?: SortOrder
    customExample?: SortOrder
  }

  export type UserVocabularyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    publicVocabularyId?: SortOrder
    addedAt?: SortOrder
    familiarity?: SortOrder
    personalNote?: SortOrder
    customDefinition?: SortOrder
    customExample?: SortOrder
  }

  export type UserVocabularySumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    publicVocabularyId?: SortOrder
    familiarity?: SortOrder
  }

  export type PublicArticleScalarRelationFilter = {
    is?: PublicArticleWhereInput
    isNot?: PublicArticleWhereInput
  }

  export type UserArticleUserIdPublicArticleIdCompoundUniqueInput = {
    userId: number
    publicArticleId: number
  }

  export type UserArticleCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    publicArticleId?: SortOrder
    savedAt?: SortOrder
  }

  export type UserArticleAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    publicArticleId?: SortOrder
  }

  export type UserArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    publicArticleId?: SortOrder
    savedAt?: SortOrder
  }

  export type UserArticleMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    publicArticleId?: SortOrder
    savedAt?: SortOrder
  }

  export type UserArticleSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    publicArticleId?: SortOrder
  }

  export type UserVocabularyCreateNestedManyWithoutPublicVocabularyInput = {
    create?: XOR<UserVocabularyCreateWithoutPublicVocabularyInput, UserVocabularyUncheckedCreateWithoutPublicVocabularyInput> | UserVocabularyCreateWithoutPublicVocabularyInput[] | UserVocabularyUncheckedCreateWithoutPublicVocabularyInput[]
    connectOrCreate?: UserVocabularyCreateOrConnectWithoutPublicVocabularyInput | UserVocabularyCreateOrConnectWithoutPublicVocabularyInput[]
    createMany?: UserVocabularyCreateManyPublicVocabularyInputEnvelope
    connect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
  }

  export type UserVocabularyUncheckedCreateNestedManyWithoutPublicVocabularyInput = {
    create?: XOR<UserVocabularyCreateWithoutPublicVocabularyInput, UserVocabularyUncheckedCreateWithoutPublicVocabularyInput> | UserVocabularyCreateWithoutPublicVocabularyInput[] | UserVocabularyUncheckedCreateWithoutPublicVocabularyInput[]
    connectOrCreate?: UserVocabularyCreateOrConnectWithoutPublicVocabularyInput | UserVocabularyCreateOrConnectWithoutPublicVocabularyInput[]
    createMany?: UserVocabularyCreateManyPublicVocabularyInputEnvelope
    connect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserVocabularyUpdateManyWithoutPublicVocabularyNestedInput = {
    create?: XOR<UserVocabularyCreateWithoutPublicVocabularyInput, UserVocabularyUncheckedCreateWithoutPublicVocabularyInput> | UserVocabularyCreateWithoutPublicVocabularyInput[] | UserVocabularyUncheckedCreateWithoutPublicVocabularyInput[]
    connectOrCreate?: UserVocabularyCreateOrConnectWithoutPublicVocabularyInput | UserVocabularyCreateOrConnectWithoutPublicVocabularyInput[]
    upsert?: UserVocabularyUpsertWithWhereUniqueWithoutPublicVocabularyInput | UserVocabularyUpsertWithWhereUniqueWithoutPublicVocabularyInput[]
    createMany?: UserVocabularyCreateManyPublicVocabularyInputEnvelope
    set?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    disconnect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    delete?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    connect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    update?: UserVocabularyUpdateWithWhereUniqueWithoutPublicVocabularyInput | UserVocabularyUpdateWithWhereUniqueWithoutPublicVocabularyInput[]
    updateMany?: UserVocabularyUpdateManyWithWhereWithoutPublicVocabularyInput | UserVocabularyUpdateManyWithWhereWithoutPublicVocabularyInput[]
    deleteMany?: UserVocabularyScalarWhereInput | UserVocabularyScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserVocabularyUncheckedUpdateManyWithoutPublicVocabularyNestedInput = {
    create?: XOR<UserVocabularyCreateWithoutPublicVocabularyInput, UserVocabularyUncheckedCreateWithoutPublicVocabularyInput> | UserVocabularyCreateWithoutPublicVocabularyInput[] | UserVocabularyUncheckedCreateWithoutPublicVocabularyInput[]
    connectOrCreate?: UserVocabularyCreateOrConnectWithoutPublicVocabularyInput | UserVocabularyCreateOrConnectWithoutPublicVocabularyInput[]
    upsert?: UserVocabularyUpsertWithWhereUniqueWithoutPublicVocabularyInput | UserVocabularyUpsertWithWhereUniqueWithoutPublicVocabularyInput[]
    createMany?: UserVocabularyCreateManyPublicVocabularyInputEnvelope
    set?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    disconnect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    delete?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    connect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    update?: UserVocabularyUpdateWithWhereUniqueWithoutPublicVocabularyInput | UserVocabularyUpdateWithWhereUniqueWithoutPublicVocabularyInput[]
    updateMany?: UserVocabularyUpdateManyWithWhereWithoutPublicVocabularyInput | UserVocabularyUpdateManyWithWhereWithoutPublicVocabularyInput[]
    deleteMany?: UserVocabularyScalarWhereInput | UserVocabularyScalarWhereInput[]
  }

  export type UserArticleCreateNestedManyWithoutPublicArticleInput = {
    create?: XOR<UserArticleCreateWithoutPublicArticleInput, UserArticleUncheckedCreateWithoutPublicArticleInput> | UserArticleCreateWithoutPublicArticleInput[] | UserArticleUncheckedCreateWithoutPublicArticleInput[]
    connectOrCreate?: UserArticleCreateOrConnectWithoutPublicArticleInput | UserArticleCreateOrConnectWithoutPublicArticleInput[]
    createMany?: UserArticleCreateManyPublicArticleInputEnvelope
    connect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
  }

  export type UserArticleUncheckedCreateNestedManyWithoutPublicArticleInput = {
    create?: XOR<UserArticleCreateWithoutPublicArticleInput, UserArticleUncheckedCreateWithoutPublicArticleInput> | UserArticleCreateWithoutPublicArticleInput[] | UserArticleUncheckedCreateWithoutPublicArticleInput[]
    connectOrCreate?: UserArticleCreateOrConnectWithoutPublicArticleInput | UserArticleCreateOrConnectWithoutPublicArticleInput[]
    createMany?: UserArticleCreateManyPublicArticleInputEnvelope
    connect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
  }

  export type UserArticleUpdateManyWithoutPublicArticleNestedInput = {
    create?: XOR<UserArticleCreateWithoutPublicArticleInput, UserArticleUncheckedCreateWithoutPublicArticleInput> | UserArticleCreateWithoutPublicArticleInput[] | UserArticleUncheckedCreateWithoutPublicArticleInput[]
    connectOrCreate?: UserArticleCreateOrConnectWithoutPublicArticleInput | UserArticleCreateOrConnectWithoutPublicArticleInput[]
    upsert?: UserArticleUpsertWithWhereUniqueWithoutPublicArticleInput | UserArticleUpsertWithWhereUniqueWithoutPublicArticleInput[]
    createMany?: UserArticleCreateManyPublicArticleInputEnvelope
    set?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    disconnect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    delete?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    connect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    update?: UserArticleUpdateWithWhereUniqueWithoutPublicArticleInput | UserArticleUpdateWithWhereUniqueWithoutPublicArticleInput[]
    updateMany?: UserArticleUpdateManyWithWhereWithoutPublicArticleInput | UserArticleUpdateManyWithWhereWithoutPublicArticleInput[]
    deleteMany?: UserArticleScalarWhereInput | UserArticleScalarWhereInput[]
  }

  export type UserArticleUncheckedUpdateManyWithoutPublicArticleNestedInput = {
    create?: XOR<UserArticleCreateWithoutPublicArticleInput, UserArticleUncheckedCreateWithoutPublicArticleInput> | UserArticleCreateWithoutPublicArticleInput[] | UserArticleUncheckedCreateWithoutPublicArticleInput[]
    connectOrCreate?: UserArticleCreateOrConnectWithoutPublicArticleInput | UserArticleCreateOrConnectWithoutPublicArticleInput[]
    upsert?: UserArticleUpsertWithWhereUniqueWithoutPublicArticleInput | UserArticleUpsertWithWhereUniqueWithoutPublicArticleInput[]
    createMany?: UserArticleCreateManyPublicArticleInputEnvelope
    set?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    disconnect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    delete?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    connect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    update?: UserArticleUpdateWithWhereUniqueWithoutPublicArticleInput | UserArticleUpdateWithWhereUniqueWithoutPublicArticleInput[]
    updateMany?: UserArticleUpdateManyWithWhereWithoutPublicArticleInput | UserArticleUpdateManyWithWhereWithoutPublicArticleInput[]
    deleteMany?: UserArticleScalarWhereInput | UserArticleScalarWhereInput[]
  }

  export type UserVocabularyCreateNestedManyWithoutUserInput = {
    create?: XOR<UserVocabularyCreateWithoutUserInput, UserVocabularyUncheckedCreateWithoutUserInput> | UserVocabularyCreateWithoutUserInput[] | UserVocabularyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVocabularyCreateOrConnectWithoutUserInput | UserVocabularyCreateOrConnectWithoutUserInput[]
    createMany?: UserVocabularyCreateManyUserInputEnvelope
    connect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
  }

  export type UserArticleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserArticleCreateWithoutUserInput, UserArticleUncheckedCreateWithoutUserInput> | UserArticleCreateWithoutUserInput[] | UserArticleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserArticleCreateOrConnectWithoutUserInput | UserArticleCreateOrConnectWithoutUserInput[]
    createMany?: UserArticleCreateManyUserInputEnvelope
    connect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
  }

  export type UserVocabularyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserVocabularyCreateWithoutUserInput, UserVocabularyUncheckedCreateWithoutUserInput> | UserVocabularyCreateWithoutUserInput[] | UserVocabularyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVocabularyCreateOrConnectWithoutUserInput | UserVocabularyCreateOrConnectWithoutUserInput[]
    createMany?: UserVocabularyCreateManyUserInputEnvelope
    connect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
  }

  export type UserArticleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserArticleCreateWithoutUserInput, UserArticleUncheckedCreateWithoutUserInput> | UserArticleCreateWithoutUserInput[] | UserArticleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserArticleCreateOrConnectWithoutUserInput | UserArticleCreateOrConnectWithoutUserInput[]
    createMany?: UserArticleCreateManyUserInputEnvelope
    connect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserVocabularyUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserVocabularyCreateWithoutUserInput, UserVocabularyUncheckedCreateWithoutUserInput> | UserVocabularyCreateWithoutUserInput[] | UserVocabularyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVocabularyCreateOrConnectWithoutUserInput | UserVocabularyCreateOrConnectWithoutUserInput[]
    upsert?: UserVocabularyUpsertWithWhereUniqueWithoutUserInput | UserVocabularyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserVocabularyCreateManyUserInputEnvelope
    set?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    disconnect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    delete?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    connect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    update?: UserVocabularyUpdateWithWhereUniqueWithoutUserInput | UserVocabularyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserVocabularyUpdateManyWithWhereWithoutUserInput | UserVocabularyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserVocabularyScalarWhereInput | UserVocabularyScalarWhereInput[]
  }

  export type UserArticleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserArticleCreateWithoutUserInput, UserArticleUncheckedCreateWithoutUserInput> | UserArticleCreateWithoutUserInput[] | UserArticleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserArticleCreateOrConnectWithoutUserInput | UserArticleCreateOrConnectWithoutUserInput[]
    upsert?: UserArticleUpsertWithWhereUniqueWithoutUserInput | UserArticleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserArticleCreateManyUserInputEnvelope
    set?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    disconnect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    delete?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    connect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    update?: UserArticleUpdateWithWhereUniqueWithoutUserInput | UserArticleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserArticleUpdateManyWithWhereWithoutUserInput | UserArticleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserArticleScalarWhereInput | UserArticleScalarWhereInput[]
  }

  export type UserVocabularyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserVocabularyCreateWithoutUserInput, UserVocabularyUncheckedCreateWithoutUserInput> | UserVocabularyCreateWithoutUserInput[] | UserVocabularyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserVocabularyCreateOrConnectWithoutUserInput | UserVocabularyCreateOrConnectWithoutUserInput[]
    upsert?: UserVocabularyUpsertWithWhereUniqueWithoutUserInput | UserVocabularyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserVocabularyCreateManyUserInputEnvelope
    set?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    disconnect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    delete?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    connect?: UserVocabularyWhereUniqueInput | UserVocabularyWhereUniqueInput[]
    update?: UserVocabularyUpdateWithWhereUniqueWithoutUserInput | UserVocabularyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserVocabularyUpdateManyWithWhereWithoutUserInput | UserVocabularyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserVocabularyScalarWhereInput | UserVocabularyScalarWhereInput[]
  }

  export type UserArticleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserArticleCreateWithoutUserInput, UserArticleUncheckedCreateWithoutUserInput> | UserArticleCreateWithoutUserInput[] | UserArticleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserArticleCreateOrConnectWithoutUserInput | UserArticleCreateOrConnectWithoutUserInput[]
    upsert?: UserArticleUpsertWithWhereUniqueWithoutUserInput | UserArticleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserArticleCreateManyUserInputEnvelope
    set?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    disconnect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    delete?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    connect?: UserArticleWhereUniqueInput | UserArticleWhereUniqueInput[]
    update?: UserArticleUpdateWithWhereUniqueWithoutUserInput | UserArticleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserArticleUpdateManyWithWhereWithoutUserInput | UserArticleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserArticleScalarWhereInput | UserArticleScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserVocabulariesInput = {
    create?: XOR<UserCreateWithoutUserVocabulariesInput, UserUncheckedCreateWithoutUserVocabulariesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserVocabulariesInput
    connect?: UserWhereUniqueInput
  }

  export type PublicVocabularyCreateNestedOneWithoutUserVocabulariesInput = {
    create?: XOR<PublicVocabularyCreateWithoutUserVocabulariesInput, PublicVocabularyUncheckedCreateWithoutUserVocabulariesInput>
    connectOrCreate?: PublicVocabularyCreateOrConnectWithoutUserVocabulariesInput
    connect?: PublicVocabularyWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserVocabulariesNestedInput = {
    create?: XOR<UserCreateWithoutUserVocabulariesInput, UserUncheckedCreateWithoutUserVocabulariesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserVocabulariesInput
    upsert?: UserUpsertWithoutUserVocabulariesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserVocabulariesInput, UserUpdateWithoutUserVocabulariesInput>, UserUncheckedUpdateWithoutUserVocabulariesInput>
  }

  export type PublicVocabularyUpdateOneRequiredWithoutUserVocabulariesNestedInput = {
    create?: XOR<PublicVocabularyCreateWithoutUserVocabulariesInput, PublicVocabularyUncheckedCreateWithoutUserVocabulariesInput>
    connectOrCreate?: PublicVocabularyCreateOrConnectWithoutUserVocabulariesInput
    upsert?: PublicVocabularyUpsertWithoutUserVocabulariesInput
    connect?: PublicVocabularyWhereUniqueInput
    update?: XOR<XOR<PublicVocabularyUpdateToOneWithWhereWithoutUserVocabulariesInput, PublicVocabularyUpdateWithoutUserVocabulariesInput>, PublicVocabularyUncheckedUpdateWithoutUserVocabulariesInput>
  }

  export type UserCreateNestedOneWithoutUserArticlesInput = {
    create?: XOR<UserCreateWithoutUserArticlesInput, UserUncheckedCreateWithoutUserArticlesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserArticlesInput
    connect?: UserWhereUniqueInput
  }

  export type PublicArticleCreateNestedOneWithoutUserArticlesInput = {
    create?: XOR<PublicArticleCreateWithoutUserArticlesInput, PublicArticleUncheckedCreateWithoutUserArticlesInput>
    connectOrCreate?: PublicArticleCreateOrConnectWithoutUserArticlesInput
    connect?: PublicArticleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserArticlesNestedInput = {
    create?: XOR<UserCreateWithoutUserArticlesInput, UserUncheckedCreateWithoutUserArticlesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserArticlesInput
    upsert?: UserUpsertWithoutUserArticlesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserArticlesInput, UserUpdateWithoutUserArticlesInput>, UserUncheckedUpdateWithoutUserArticlesInput>
  }

  export type PublicArticleUpdateOneRequiredWithoutUserArticlesNestedInput = {
    create?: XOR<PublicArticleCreateWithoutUserArticlesInput, PublicArticleUncheckedCreateWithoutUserArticlesInput>
    connectOrCreate?: PublicArticleCreateOrConnectWithoutUserArticlesInput
    upsert?: PublicArticleUpsertWithoutUserArticlesInput
    connect?: PublicArticleWhereUniqueInput
    update?: XOR<XOR<PublicArticleUpdateToOneWithWhereWithoutUserArticlesInput, PublicArticleUpdateWithoutUserArticlesInput>, PublicArticleUncheckedUpdateWithoutUserArticlesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserVocabularyCreateWithoutPublicVocabularyInput = {
    addedAt?: Date | string
    familiarity?: number
    personalNote?: string | null
    customDefinition?: string | null
    customExample?: string | null
    user: UserCreateNestedOneWithoutUserVocabulariesInput
  }

  export type UserVocabularyUncheckedCreateWithoutPublicVocabularyInput = {
    id?: number
    userId: number
    addedAt?: Date | string
    familiarity?: number
    personalNote?: string | null
    customDefinition?: string | null
    customExample?: string | null
  }

  export type UserVocabularyCreateOrConnectWithoutPublicVocabularyInput = {
    where: UserVocabularyWhereUniqueInput
    create: XOR<UserVocabularyCreateWithoutPublicVocabularyInput, UserVocabularyUncheckedCreateWithoutPublicVocabularyInput>
  }

  export type UserVocabularyCreateManyPublicVocabularyInputEnvelope = {
    data: UserVocabularyCreateManyPublicVocabularyInput | UserVocabularyCreateManyPublicVocabularyInput[]
  }

  export type UserVocabularyUpsertWithWhereUniqueWithoutPublicVocabularyInput = {
    where: UserVocabularyWhereUniqueInput
    update: XOR<UserVocabularyUpdateWithoutPublicVocabularyInput, UserVocabularyUncheckedUpdateWithoutPublicVocabularyInput>
    create: XOR<UserVocabularyCreateWithoutPublicVocabularyInput, UserVocabularyUncheckedCreateWithoutPublicVocabularyInput>
  }

  export type UserVocabularyUpdateWithWhereUniqueWithoutPublicVocabularyInput = {
    where: UserVocabularyWhereUniqueInput
    data: XOR<UserVocabularyUpdateWithoutPublicVocabularyInput, UserVocabularyUncheckedUpdateWithoutPublicVocabularyInput>
  }

  export type UserVocabularyUpdateManyWithWhereWithoutPublicVocabularyInput = {
    where: UserVocabularyScalarWhereInput
    data: XOR<UserVocabularyUpdateManyMutationInput, UserVocabularyUncheckedUpdateManyWithoutPublicVocabularyInput>
  }

  export type UserVocabularyScalarWhereInput = {
    AND?: UserVocabularyScalarWhereInput | UserVocabularyScalarWhereInput[]
    OR?: UserVocabularyScalarWhereInput[]
    NOT?: UserVocabularyScalarWhereInput | UserVocabularyScalarWhereInput[]
    id?: IntFilter<"UserVocabulary"> | number
    userId?: IntFilter<"UserVocabulary"> | number
    publicVocabularyId?: IntFilter<"UserVocabulary"> | number
    addedAt?: DateTimeFilter<"UserVocabulary"> | Date | string
    familiarity?: IntFilter<"UserVocabulary"> | number
    personalNote?: StringNullableFilter<"UserVocabulary"> | string | null
    customDefinition?: StringNullableFilter<"UserVocabulary"> | string | null
    customExample?: StringNullableFilter<"UserVocabulary"> | string | null
  }

  export type UserArticleCreateWithoutPublicArticleInput = {
    savedAt?: Date | string
    user: UserCreateNestedOneWithoutUserArticlesInput
  }

  export type UserArticleUncheckedCreateWithoutPublicArticleInput = {
    id?: number
    userId: number
    savedAt?: Date | string
  }

  export type UserArticleCreateOrConnectWithoutPublicArticleInput = {
    where: UserArticleWhereUniqueInput
    create: XOR<UserArticleCreateWithoutPublicArticleInput, UserArticleUncheckedCreateWithoutPublicArticleInput>
  }

  export type UserArticleCreateManyPublicArticleInputEnvelope = {
    data: UserArticleCreateManyPublicArticleInput | UserArticleCreateManyPublicArticleInput[]
  }

  export type UserArticleUpsertWithWhereUniqueWithoutPublicArticleInput = {
    where: UserArticleWhereUniqueInput
    update: XOR<UserArticleUpdateWithoutPublicArticleInput, UserArticleUncheckedUpdateWithoutPublicArticleInput>
    create: XOR<UserArticleCreateWithoutPublicArticleInput, UserArticleUncheckedCreateWithoutPublicArticleInput>
  }

  export type UserArticleUpdateWithWhereUniqueWithoutPublicArticleInput = {
    where: UserArticleWhereUniqueInput
    data: XOR<UserArticleUpdateWithoutPublicArticleInput, UserArticleUncheckedUpdateWithoutPublicArticleInput>
  }

  export type UserArticleUpdateManyWithWhereWithoutPublicArticleInput = {
    where: UserArticleScalarWhereInput
    data: XOR<UserArticleUpdateManyMutationInput, UserArticleUncheckedUpdateManyWithoutPublicArticleInput>
  }

  export type UserArticleScalarWhereInput = {
    AND?: UserArticleScalarWhereInput | UserArticleScalarWhereInput[]
    OR?: UserArticleScalarWhereInput[]
    NOT?: UserArticleScalarWhereInput | UserArticleScalarWhereInput[]
    id?: IntFilter<"UserArticle"> | number
    userId?: IntFilter<"UserArticle"> | number
    publicArticleId?: IntFilter<"UserArticle"> | number
    savedAt?: DateTimeFilter<"UserArticle"> | Date | string
  }

  export type UserVocabularyCreateWithoutUserInput = {
    addedAt?: Date | string
    familiarity?: number
    personalNote?: string | null
    customDefinition?: string | null
    customExample?: string | null
    publicVocabulary: PublicVocabularyCreateNestedOneWithoutUserVocabulariesInput
  }

  export type UserVocabularyUncheckedCreateWithoutUserInput = {
    id?: number
    publicVocabularyId: number
    addedAt?: Date | string
    familiarity?: number
    personalNote?: string | null
    customDefinition?: string | null
    customExample?: string | null
  }

  export type UserVocabularyCreateOrConnectWithoutUserInput = {
    where: UserVocabularyWhereUniqueInput
    create: XOR<UserVocabularyCreateWithoutUserInput, UserVocabularyUncheckedCreateWithoutUserInput>
  }

  export type UserVocabularyCreateManyUserInputEnvelope = {
    data: UserVocabularyCreateManyUserInput | UserVocabularyCreateManyUserInput[]
  }

  export type UserArticleCreateWithoutUserInput = {
    savedAt?: Date | string
    publicArticle: PublicArticleCreateNestedOneWithoutUserArticlesInput
  }

  export type UserArticleUncheckedCreateWithoutUserInput = {
    id?: number
    publicArticleId: number
    savedAt?: Date | string
  }

  export type UserArticleCreateOrConnectWithoutUserInput = {
    where: UserArticleWhereUniqueInput
    create: XOR<UserArticleCreateWithoutUserInput, UserArticleUncheckedCreateWithoutUserInput>
  }

  export type UserArticleCreateManyUserInputEnvelope = {
    data: UserArticleCreateManyUserInput | UserArticleCreateManyUserInput[]
  }

  export type UserVocabularyUpsertWithWhereUniqueWithoutUserInput = {
    where: UserVocabularyWhereUniqueInput
    update: XOR<UserVocabularyUpdateWithoutUserInput, UserVocabularyUncheckedUpdateWithoutUserInput>
    create: XOR<UserVocabularyCreateWithoutUserInput, UserVocabularyUncheckedCreateWithoutUserInput>
  }

  export type UserVocabularyUpdateWithWhereUniqueWithoutUserInput = {
    where: UserVocabularyWhereUniqueInput
    data: XOR<UserVocabularyUpdateWithoutUserInput, UserVocabularyUncheckedUpdateWithoutUserInput>
  }

  export type UserVocabularyUpdateManyWithWhereWithoutUserInput = {
    where: UserVocabularyScalarWhereInput
    data: XOR<UserVocabularyUpdateManyMutationInput, UserVocabularyUncheckedUpdateManyWithoutUserInput>
  }

  export type UserArticleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserArticleWhereUniqueInput
    update: XOR<UserArticleUpdateWithoutUserInput, UserArticleUncheckedUpdateWithoutUserInput>
    create: XOR<UserArticleCreateWithoutUserInput, UserArticleUncheckedCreateWithoutUserInput>
  }

  export type UserArticleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserArticleWhereUniqueInput
    data: XOR<UserArticleUpdateWithoutUserInput, UserArticleUncheckedUpdateWithoutUserInput>
  }

  export type UserArticleUpdateManyWithWhereWithoutUserInput = {
    where: UserArticleScalarWhereInput
    data: XOR<UserArticleUpdateManyMutationInput, UserArticleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCreateWithoutUserVocabulariesInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    nativeLanguage?: string | null
    emailVerified?: boolean
    verificationToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    userArticles?: UserArticleCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserVocabulariesInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    nativeLanguage?: string | null
    emailVerified?: boolean
    verificationToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    userArticles?: UserArticleUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserVocabulariesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserVocabulariesInput, UserUncheckedCreateWithoutUserVocabulariesInput>
  }

  export type PublicVocabularyCreateWithoutUserVocabulariesInput = {
    word: string
    createdAt?: Date | string
    updatedAt?: Date | string
    partOfSpeech: string
    definition: string
    localDefinition?: string | null
    example?: string | null
    exampleTranslation?: string | null
    pronunciation?: string | null
    synonyms?: string | null
    antonyms?: string | null
  }

  export type PublicVocabularyUncheckedCreateWithoutUserVocabulariesInput = {
    id?: number
    word: string
    createdAt?: Date | string
    updatedAt?: Date | string
    partOfSpeech: string
    definition: string
    localDefinition?: string | null
    example?: string | null
    exampleTranslation?: string | null
    pronunciation?: string | null
    synonyms?: string | null
    antonyms?: string | null
  }

  export type PublicVocabularyCreateOrConnectWithoutUserVocabulariesInput = {
    where: PublicVocabularyWhereUniqueInput
    create: XOR<PublicVocabularyCreateWithoutUserVocabulariesInput, PublicVocabularyUncheckedCreateWithoutUserVocabulariesInput>
  }

  export type UserUpsertWithoutUserVocabulariesInput = {
    update: XOR<UserUpdateWithoutUserVocabulariesInput, UserUncheckedUpdateWithoutUserVocabulariesInput>
    create: XOR<UserCreateWithoutUserVocabulariesInput, UserUncheckedCreateWithoutUserVocabulariesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserVocabulariesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserVocabulariesInput, UserUncheckedUpdateWithoutUserVocabulariesInput>
  }

  export type UserUpdateWithoutUserVocabulariesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nativeLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userArticles?: UserArticleUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserVocabulariesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nativeLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userArticles?: UserArticleUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PublicVocabularyUpsertWithoutUserVocabulariesInput = {
    update: XOR<PublicVocabularyUpdateWithoutUserVocabulariesInput, PublicVocabularyUncheckedUpdateWithoutUserVocabulariesInput>
    create: XOR<PublicVocabularyCreateWithoutUserVocabulariesInput, PublicVocabularyUncheckedCreateWithoutUserVocabulariesInput>
    where?: PublicVocabularyWhereInput
  }

  export type PublicVocabularyUpdateToOneWithWhereWithoutUserVocabulariesInput = {
    where?: PublicVocabularyWhereInput
    data: XOR<PublicVocabularyUpdateWithoutUserVocabulariesInput, PublicVocabularyUncheckedUpdateWithoutUserVocabulariesInput>
  }

  export type PublicVocabularyUpdateWithoutUserVocabulariesInput = {
    word?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partOfSpeech?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    localDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    synonyms?: NullableStringFieldUpdateOperationsInput | string | null
    antonyms?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicVocabularyUncheckedUpdateWithoutUserVocabulariesInput = {
    id?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partOfSpeech?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    localDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    synonyms?: NullableStringFieldUpdateOperationsInput | string | null
    antonyms?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutUserArticlesInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    nativeLanguage?: string | null
    emailVerified?: boolean
    verificationToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    userVocabularies?: UserVocabularyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserArticlesInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    nativeLanguage?: string | null
    emailVerified?: boolean
    verificationToken?: string | null
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    userVocabularies?: UserVocabularyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserArticlesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserArticlesInput, UserUncheckedCreateWithoutUserArticlesInput>
  }

  export type PublicArticleCreateWithoutUserArticlesInput = {
    slug: string
    title: string
    content: string
    publishedAt?: Date | string
    updatedAt?: Date | string
    author?: string | null
    coverImage?: string | null
  }

  export type PublicArticleUncheckedCreateWithoutUserArticlesInput = {
    id?: number
    slug: string
    title: string
    content: string
    publishedAt?: Date | string
    updatedAt?: Date | string
    author?: string | null
    coverImage?: string | null
  }

  export type PublicArticleCreateOrConnectWithoutUserArticlesInput = {
    where: PublicArticleWhereUniqueInput
    create: XOR<PublicArticleCreateWithoutUserArticlesInput, PublicArticleUncheckedCreateWithoutUserArticlesInput>
  }

  export type UserUpsertWithoutUserArticlesInput = {
    update: XOR<UserUpdateWithoutUserArticlesInput, UserUncheckedUpdateWithoutUserArticlesInput>
    create: XOR<UserCreateWithoutUserArticlesInput, UserUncheckedCreateWithoutUserArticlesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserArticlesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserArticlesInput, UserUncheckedUpdateWithoutUserArticlesInput>
  }

  export type UserUpdateWithoutUserArticlesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nativeLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userVocabularies?: UserVocabularyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserArticlesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nativeLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userVocabularies?: UserVocabularyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PublicArticleUpsertWithoutUserArticlesInput = {
    update: XOR<PublicArticleUpdateWithoutUserArticlesInput, PublicArticleUncheckedUpdateWithoutUserArticlesInput>
    create: XOR<PublicArticleCreateWithoutUserArticlesInput, PublicArticleUncheckedCreateWithoutUserArticlesInput>
    where?: PublicArticleWhereInput
  }

  export type PublicArticleUpdateToOneWithWhereWithoutUserArticlesInput = {
    where?: PublicArticleWhereInput
    data: XOR<PublicArticleUpdateWithoutUserArticlesInput, PublicArticleUncheckedUpdateWithoutUserArticlesInput>
  }

  export type PublicArticleUpdateWithoutUserArticlesInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PublicArticleUncheckedUpdateWithoutUserArticlesInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserVocabularyCreateManyPublicVocabularyInput = {
    id?: number
    userId: number
    addedAt?: Date | string
    familiarity?: number
    personalNote?: string | null
    customDefinition?: string | null
    customExample?: string | null
  }

  export type UserVocabularyUpdateWithoutPublicVocabularyInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familiarity?: IntFieldUpdateOperationsInput | number
    personalNote?: NullableStringFieldUpdateOperationsInput | string | null
    customDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    customExample?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutUserVocabulariesNestedInput
  }

  export type UserVocabularyUncheckedUpdateWithoutPublicVocabularyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familiarity?: IntFieldUpdateOperationsInput | number
    personalNote?: NullableStringFieldUpdateOperationsInput | string | null
    customDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    customExample?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserVocabularyUncheckedUpdateManyWithoutPublicVocabularyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familiarity?: IntFieldUpdateOperationsInput | number
    personalNote?: NullableStringFieldUpdateOperationsInput | string | null
    customDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    customExample?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserArticleCreateManyPublicArticleInput = {
    id?: number
    userId: number
    savedAt?: Date | string
  }

  export type UserArticleUpdateWithoutPublicArticleInput = {
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserArticlesNestedInput
  }

  export type UserArticleUncheckedUpdateWithoutPublicArticleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArticleUncheckedUpdateManyWithoutPublicArticleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserVocabularyCreateManyUserInput = {
    id?: number
    publicVocabularyId: number
    addedAt?: Date | string
    familiarity?: number
    personalNote?: string | null
    customDefinition?: string | null
    customExample?: string | null
  }

  export type UserArticleCreateManyUserInput = {
    id?: number
    publicArticleId: number
    savedAt?: Date | string
  }

  export type UserVocabularyUpdateWithoutUserInput = {
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familiarity?: IntFieldUpdateOperationsInput | number
    personalNote?: NullableStringFieldUpdateOperationsInput | string | null
    customDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    customExample?: NullableStringFieldUpdateOperationsInput | string | null
    publicVocabulary?: PublicVocabularyUpdateOneRequiredWithoutUserVocabulariesNestedInput
  }

  export type UserVocabularyUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    publicVocabularyId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familiarity?: IntFieldUpdateOperationsInput | number
    personalNote?: NullableStringFieldUpdateOperationsInput | string | null
    customDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    customExample?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserVocabularyUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    publicVocabularyId?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    familiarity?: IntFieldUpdateOperationsInput | number
    personalNote?: NullableStringFieldUpdateOperationsInput | string | null
    customDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    customExample?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserArticleUpdateWithoutUserInput = {
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publicArticle?: PublicArticleUpdateOneRequiredWithoutUserArticlesNestedInput
  }

  export type UserArticleUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    publicArticleId?: IntFieldUpdateOperationsInput | number
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArticleUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    publicArticleId?: IntFieldUpdateOperationsInput | number
    savedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}