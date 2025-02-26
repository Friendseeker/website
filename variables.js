const sbtVersion = "1.10.7";
const scala3ExampleVersion = "3.3.3";
const releasesBase = "https://github.com/sbt/sbt/releases/download";
const VersionList = [
  { v: "1.10.7" },
  { v: "1.10.6" },
  { v: "1.10.5" },
  { v: "1.10.4" },
  { v: "1.10.3" },
  { v: "1.10.2" },
  { v: "1.10.1" },
  { v: "1.10.0" },
  { v: "1.9.9" },
  { v: "1.9.8" },
  { v: "1.9.7" },
  { v: "1.9.6" },
  { v: "1.9.5" },
  { v: "1.9.4" },
  { v: "1.9.3" },
  { v: "1.9.2" },
  { v: "1.9.1" },
  { v: "1.9.0" },
  { v: "1.8.3" },
  { v: "1.8.2" },
  { v: "1.8.1" },
  { v: "1.8.0" },
  { v: "1.7.3" },
  { v: "1.7.2" },
  { v: "1.7.1" },
  { v: "1.7.0" },
  { v: "1.6.2" },
  { v: "1.6.1" },
  { v: "1.6.0" },
  { v: "1.5.8" },
  { v: "1.5.7" },
  { v: "1.5.6" },
  { v: "1.5.5" },
  { v: "1.5.4" },
  { v: "1.5.3" },
  { v: "1.5.2" },
  { v: "1.5.1" },
  { v: "1.5.0" },
  { v: "1.4.9" },
  { v: "1.4.8" },
  { v: "1.4.7" },
  { v: "1.4.6" },
  { v: "1.4.5" },
  { v: "1.4.4" },
  { v: "1.4.3" },
  { v: "1.4.2" },
  { v: "1.4.1" },
  { v: "1.4.0" },
  { v: "1.3.13" },
  { v: "1.3.12" },
  { v: "1.3.10" },
  { v: "1.3.9" },
  { v: "1.3.8" },
  { v: "1.3.7" },
  { v: "1.3.6" },
  { v: "1.3.5" },
  { v: "1.3.4" },
  { v: "1.3.3" },
  { v: "1.3.2" },
  { v: "1.3.1" },
  { v: "1.3.0" },
  { v: "1.2.8" },
  { v: "1.2.7" },
  { v: "1.2.6" },
  { v: "1.2.4" },
  { v: "1.2.3" },
  { v: "1.2.1" },
  { v: "1.2.0" },
  { v: "1.1.6" },
  { v: "1.1.5" },
  { v: "1.1.4" },
  { v: "1.1.2" },
  { v: "1.1.1" },
  { v: "1.1.0" },
  { v: "1.0.4" },
  { v: "1.0.3" },
  { v: "1.0.2" },
  { v: "1.0.1" },
  { v: "1.0.0" },
];

function downloadUrl(tagVersion, version, ext) {
  return releasesBase + "/v" + tagVersion + "/sbt-" + version + ext;
}

module.exports = {
  sbtVersion: sbtVersion,
  windowsBuild: sbtVersion,
  sbtVersionForScalaDoc: sbtVersion,
  downloadUrl: downloadUrl,
  scala3ExampleVersion: scala3ExampleVersion,
  VersionList: VersionList,
};
