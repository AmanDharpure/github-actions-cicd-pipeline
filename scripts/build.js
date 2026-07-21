const fs = require("fs");
const path = require("path");

const rootDirectory = path.join(__dirname, "..");
const buildDirectory = path.join(rootDirectory, "dist");

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });

  const entries = fs.readdirSync(source, {
    withFileTypes: true
  });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

try {
  fs.rmSync(buildDirectory, {
    recursive: true,
    force: true
  });

  fs.mkdirSync(buildDirectory, {
    recursive: true
  });

  copyDirectory(
    path.join(rootDirectory, "src"),
    path.join(buildDirectory, "src")
  );

  fs.copyFileSync(
    path.join(rootDirectory, "package.json"),
    path.join(buildDirectory, "package.json")
  );

  fs.copyFileSync(
    path.join(rootDirectory, "package-lock.json"),
    path.join(buildDirectory, "package-lock.json")
  );

  const buildInformation = {
    application: "GitHub Actions CI/CD Pipeline",
    version: process.env.npm_package_version || "1.0.0",
    commit: process.env.GITHUB_SHA || "local-build",
    buildTime: new Date().toISOString()
  };

  fs.writeFileSync(
    path.join(buildDirectory, "build-info.json"),
    JSON.stringify(buildInformation, null, 2)
  );

  console.log("Build completed successfully.");
  console.log(`Build output: ${buildDirectory}`);
} catch (error) {
  console.error("Build failed:", error.message);
  process.exit(1);
}