export default {
  '**/*.{ts,tsx}': [
    'prettier --write',
    () => 'pnpm lint', // file name will not be passed by arguments
    () => 'pnpm check-types',
  ],
  '**/*.{js,css,md,json}': 'prettier --write',
};
