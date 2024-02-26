import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../server/src/graphql/schema/*/index.ts',
  documents: ['./**/*.{ts,tsx}'],
  generates: {
    './graphql/generated.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config
