// scripts/copy-sodium-native.js
const fs = require("fs-extra");
const path = require("path");

const sodiumPath = path.join(
  __dirname,
  "../node_modules/sodium-native/prebuilds/"
);

const targets = [
  ".next/server/app/(auth)/login",
  ".next/server/app/api/rpc/[...blitz]",
  ".next/server/app/(auth)/reset-password"
];

async function copyPrebuilds() {
  try {
    for (const target of targets) {
      const dest = path.join(__dirname, "..", target);
      await fs.ensureDir(dest);
      await fs.copy(sodiumPath, dest, { overwrite: true });
      console.log(`✅ Copied sodium-native prebuilds to ${target}`);
    }
  } catch (err) {
    console.error("❌ Failed to copy sodium-native prebuilds:", err);
    process.exit(1);
  }
}

copyPrebuilds();
