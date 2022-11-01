/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

 const config = {
   testDir: '.',
   testMatch: /.spec.js/,
   // Snapshots need to be generated into a directory that is checked into
   // version control. Default `config.testDir` generates snapshots into the
   // built `lib` directory which is ignored.
   snapshotDir: '../src/playwright',
   retries: 0,
   use: {
     screenshot: 'off',
     baseURL: 'http://localhost:8000/',
   },
   webServer: {
     command: 'npm run dev',
     port: 8000,
     // TODO(aomarks).
     // We shouldn't really need this, but playwright sends a SIGKILL instead of
     // a SIGTERM or SIGINT, which doesn't seem to allow our server to clean up,
     // meaning it keeps running after the test.
     // See https://github.com/microsoft/playwright/issues/12299.
     // Wireit service mode would also solve this:
     // https://github.com/google/wireit/issues/33.
     reuseExistingServer: true,
   },
   // Prevent implicit snapshot creation and tests passing. Create screenshots
   // explicitly with either:
   //  * Github Action: "Artifacts / Download link for updated screenshots" for
   //    committing the snapshot to the repository.
   //  * `npm run test:integration:update-golden-screenshots` for local testing.
   updateSnapshots: 'none',
 };
 export default config;
