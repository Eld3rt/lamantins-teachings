import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../server/src/graphql/schema/*/index.ts',
  documents: ['./**/*.{ts,tsx}'],
  generates: {
    './graphql/types_and_hooks.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config
