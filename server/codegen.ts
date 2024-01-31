import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/graphql/schema/*/index.ts',
  generates: {
    './src/graphql/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        emitLegacyCommonJSImports: false,
        contextType: '../../apollo/server#MyContext',
        mappers: {
          User: '.prisma/client#User as UserModel',
        },
      },
    },
  },
}
export default config
