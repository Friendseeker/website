
  [Basic-Def]: Basic-Def.html
  [Setup]: Setup.md
  [Running]: Running.html
  [Essential-sbt]: https://www.scalawilliam.com/essential-sbt/

sbt by example
==============

This page assumes you've [installed sbt runner][Setup].

Let's start with examples rather than explaining how sbt works or why.

### Create a minimum sbt build

```bash
mkdir foo-build
cd foo-build
touch build.sbt
mkdir project
echo "sbt.version={{sbt_version}}" > project/build.properties
```

### Start sbt shell

```bash
$ sbt
[info] welcome to sbt {{sbt_version}} (Azul Systems, Inc. Java)
....
[info] started sbt server
sbt:foo-build>
```

### Exit sbt shell

To leave sbt shell, type `exit` or use Ctrl+D (Unix) or Ctrl+Z (Windows).

```
sbt:foo-build> exit
```

### Compile a project

As a convention, we will use the `sbt:...>` or `>` prompt to mean that we're in the sbt interactive shell.

```bash
$ sbt
sbt:foo-build> compile
[success] elapsed time: 0 s, cache 0%, 1 onsite task
```

### Recompile on code change

Prefixing the `compile` command (or any other command) with `~` causes the command to be automatically
re-executed whenever one of the source files within the project is modified. For example:

```
sbt:foo-build> ~compile
[success] elapsed time: 0 s, cache 100%, 1 disk cache hit
[info] 1. Monitoring source files for foo-build/compile...
[info]    Press <enter> to interrupt or '?' for more options.
```

### Create a source file

Leave the previous command running. From a different shell or in your file manager create in the foo-build
directory the following nested directories: `src/main/scala/example`. Then, create `Hello.scala`
in the `example` directory using your favorite editor as follows:

```scala
package example

@main def main(args: String*): Unit =
  println(s"Hello ${args.mkString}")
```

This new file should be picked up by the running command:

```
[info] Build triggered by /tmp/foo-build/src/main/scala/example/Hello.scala. Running 'compile'.
[info] compiling 1 Scala source to /tmp/foo-build/target/out/jvm/scala-3.3.3/foo/backend ...
[success] elapsed time: 1 s, cache 0%, 1 onsite task
[info] 2. Monitoring source files for foo-build/compile...
[info]    Press <enter> to interrupt or '?' for more options.
```

Press `Enter` to exit `~compile`.

### Run a previous command

From sbt shell, press up-arrow twice to find the `compile` command that you
executed at the beginning.

```
sbt:foo-build> compile
```

### Getting help

Use the `help` command to get basic help about the available commands.

```
sbt:foo-build> help

  <command> (; <command>)*                       Runs the provided semicolon-separated commands.
  about                                          Displays basic information about sbt and the build.
  tasks                                          Lists the tasks defined for the current project.
  settings                                       Lists the settings defined for the current project.
  reload                                         (Re)loads the current project or changes to plugins project or returns from it.
  new                                            Creates a new sbt build.
  new                                            Creates a new sbt build.
  projects                                       Lists the names of available projects or temporarily adds/removes extra builds to the session.

....
```

Display the description of a specific task:

```
sbt:foo-build> help run
Runs a main class, passing along arguments provided on the command line.
```

### Run your app

```
sbt:foo> run
[info] running example.main
Hello
[success] elapsed time: 0 s, cache 50%, 1 disk cache hit, 1 onsite task
```

### Set ThisBuild / scalaVersion from sbt shell

```
sbt:foo-build> set scalaVersion := "{{scala3_example_version}}"
[info] Defining scalaVersion
[info] The new value will be used by Compile / bspBuildTarget, Compile / dependencyTreeCrossProjectId and 51 others.
[info]  Run `last` for details.
[info] Reapplying settings...
[info] set current project to foo (in build file:/tmp/foo-build/)
```

Check the `scalaVersion` setting:

```
sbt:foo-build> scalaVersion
[info] {{scala3_example_version}}
```

### Save the session to build.sbt

We can save the ad-hoc settings using `session save`.

```
sbt:foo-build> session save
[info] Reapplying settings...
[info] set current project to foo-build (in build file:/tmp/foo-build/)
[warn] build source files have changed
[warn] modified files:
[warn]   /tmp/foo-build/build.sbt
[warn] Apply these changes by running `reload`.
[warn] Automatically reload the build when source changes are detected by setting `Global / onChangedBuildSource := ReloadOnSourceChanges`.
[warn] Disable this warning by setting `Global / onChangedBuildSource := IgnoreSourceChanges`.
```

`build.sbt` file should now contain:

```scala
scalaVersion := "{{scala3_example_version}}"

```

### Name your project

Using an editor, change `build.sbt` as follows:

```scala
{{#include ../sbt-test/ref/example-name/build.sbt}}
```

### Reload the build

Use the `reload` command to reload the build. The command causes the
`build.sbt` file to be re-read, and its settings applied.

```
sbt:foo-build> reload
[info] welcome to sbt 2.x (Azul Systems, Inc. Java)
[info] loading project definition from /tmp/foo-build/project
[info] loading settings for project hello from build.sbt ...
[info] set current project to Hello (in build file:/tmp/foo-build/)
sbt:Hello>
```

Note that the prompt has now changed to `sbt:Hello>`.

### Add toolkit-test to libraryDependencies

Using an editor, change `build.sbt` as follows:

```scala
{{#include ../sbt-test/ref/example-test/build.sbt}}
```

Use the `reload` command to reflect the change in `build.sbt`.

```
sbt:Hello> reload
```

### Run incremental tests

```
sbt:Hello> test
```

### Run incremental tests continuously

```
sbt:Hello> ~test
```

### Write a test

Leaving the previous command running, create a file named `src/test/scala/example/HelloSuite.scala`
using an editor:

```scala
{{#include ../sbt-test/ref/example-test/src/test/scala/example/HelloSuite.scala}}
```

`~test` should pick up the change:

```
example.HelloSuite:
==> X example.HelloSuite.Hello should start with H  0.012s munit.FailException: /tmp/foo-build/src/test/scala/example/HelloSuite.scala:5 assertion failed
4:  test("Hello should start with H") {
5:    assert("hello".startsWith("H"))
6:  }
    at munit.FunSuite.assert(FunSuite.scala:11)
    at example.HelloSuite.$init$$$anonfun$1(HelloSuite.scala:5)
[error] Failed: Total 1, Failed 1, Errors 0, Passed 0
[error] Failed tests:
[error]   example.HelloSuite
[error] (Test / testQuick) sbt.TestsFailedException: Tests unsuccessful
[error] elapsed time: 1 s, cache 50%, 3 disk cache hits, 3 onsite tasks
```

### Make the test pass

Using an editor, change `src/test/scala/example/HelloSuite.scala` to:

```scala
{{#include ../sbt-test/ref/example-test/changes/HelloSuite.scala}}
```

Confirm that the test passes, then press `Enter` to exit the continuous test.

### Add a library dependency

Using an editor, change `build.sbt` as follows:

```scala
{{#include ../sbt-test/ref/example-library/build.sbt}}
```

Use the `reload` command to reflect the change in `build.sbt`.

### Use Scala REPL

We can find out the current weather in New York.

```scala
sbt:Hello> console
Welcome to Scala 3.3.3 (1.8.0_402, Java OpenJDK 64-Bit Server VM).
Type in expressions for evaluation. Or try :help.

scala>
import sttp.client4.quick.*
import sttp.client4.Response

val newYorkLatitude: Double = 40.7143
val newYorkLongitude: Double = -74.006
val response: Response[String] = quickRequest
  .get(
    uri"https://api.open-meteo.com/v1/forecast?latitude=\$newYorkLatitude&longitude=\$newYorkLongitude&current_weather=true"
  )
  .send()

println(ujson.read(response.body).render(indent = 2))

// press Ctrl+D

// Exiting paste mode, now interpreting.

{
  "latitude": 40.710335,
  "longitude": -73.99307,
  "generationtime_ms": 0.36704540252685547,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 51,
  "current_weather": {
    "temperature": 21.3,
    "windspeed": 16.7,
    "winddirection": 205,
    "weathercode": 3,
    "is_day": 1,
    "time": "2023-08-04T10:00"
  }
}
import sttp.client4.quick._
import sttp.client4.Response
val newYorkLatitude: Double = 40.7143
val newYorkLongitude: Double = -74.006
val response: sttp.client4.Response[String] = Response({"latitude":40.710335,"longitude":-73.99307,"generationtime_ms":0.36704540252685547,"utc_offset_seconds":0,"timezone":"GMT","timezone_abbreviation":"GMT","elevation":51.0,"current_weather":{"temperature":21.3,"windspeed":16.7,"winddirection":205.0,"weathercode":3,"is_day":1,"time":"2023-08-04T10:00"}},200,,List(:status: 200, content-encoding: deflate, content-type: application/json; charset=utf-8, date: Fri, 04 Aug 2023 10:09:11 GMT),List(),RequestMetadata(GET,https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude...

scala> :q // to quit
```

### Make a subproject

Change `build.sbt` as follows:

```scala
{{#include ../sbt-test/ref/example-sub1/build.sbt}}
```

Use the `reload` command to reflect the change in `build.sbt`.

### List all subprojects

```
sbt:Hello> projects
[info] In file:/tmp/foo-build/
[info]   * hello
[info]     helloCore
```

### Compile the subproject

```
sbt:Hello> helloCore/compile
```

### Add toolkit-test to the subproject

Change `build.sbt` as follows:

```scala
{{#include ../sbt-test/ref/example-sub2/build.sbt}}
```

### Broadcast commands

Set aggregate so that the command sent to `hello` is broadcast to `helloCore` too:

```scala
{{#include ../sbt-test/ref/example-sub3/build.sbt}}
```

After `reload`, `~test` now runs on both subprojects:

```scala
sbt:Hello> ~test
```

Press `Enter` to exit the continuous test.

### Make hello depend on helloCore

Use `.dependsOn(...)` to add a dependency on other subprojects. Also let's move the toolkit dependency to `helloCore`.

```scala
{{#include ../sbt-test/ref/example-sub4/build.sbt}}
```

### Parse JSON using uJson

Let's use uJson from the toolkit in `helloCore`.

Add `core/src/main/scala/example/core/Weather.scala`:

```scala
package example.core

import sttp.client4.quick._
import sttp.client4.Response

object Weather:
  def temp() =
    val response: Response[String] = quickRequest
      .get(
        uri"https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&current_weather=true"
      )
      .send()
    val json = ujson.read(response.body)
    json.obj("current_weather")("temperature").num
end Weather
```

Next, change `src/main/scala/example/Hello.scala` as follows:

```scala
package example

import example.core.Weather

@main def main(args: String*): Unit =
  val temp = Weather.temp()
  println(s"Hello! The current temperature in New York is $temp C.")
```

Let's run the app to see if it worked:

```
sbt:Hello> run
[info] compiling 1 Scala source to /tmp/foo-build/core/target/scala-2.13/classes ...
[info] compiling 1 Scala source to /tmp/foo-build/target/scala-2.13/classes ...
[info] running example.Hello
Hello! The current temperature in New York is 22.7 C.
```

<!--
### Add sbt-native-packager plugin

Using an editor, create `project/plugins.sbt`:

@@snip [example-weather-plugins]($root$/src/sbt-test/ref/example-weather/changes/plugins.sbt) {}

Next change `build.sbt` as follows to add `JavaAppPackaging`:

@@snip [example-weather-build2]($root$/src/sbt-test/ref/example-weather/changes/build.sbt) {}

### Reload and create a .zip distribution

```
sbt:Hello> reload
...
sbt:Hello> dist
[info] Wrote /private/tmp/foo-build/target/scala-2.13/hello_2.13-0.1.0-SNAPSHOT.pom
[info] Main Scala API documentation to /tmp/foo-build/target/scala-2.13/api...
[info] Main Scala API documentation successful.
[info] Main Scala API documentation to /tmp/foo-build/core/target/scala-2.13/api...
[info] Wrote /tmp/foo-build/core/target/scala-2.13/hello-core_2.13-0.1.0-SNAPSHOT.pom
[info] Main Scala API documentation successful.
[success] All package validations passed
[info] Your package is ready in /tmp/foo-build/target/universal/hello-0.1.0-SNAPSHOT.zip
```

Here's how you can run the packaged app:

```
$ /tmp/someother
$ cd /tmp/someother
$ unzip -o -d /tmp/someother /tmp/foo-build/target/universal/hello-0.1.0-SNAPSHOT.zip
$ ./hello-0.1.0-SNAPSHOT/bin/hello
Hello! The current temperature in New York is 22.7 C.
```

### Dockerize your app

_Note that a Docker daemon will need to be running in order for this to work._

```
sbt:Hello> Docker/publishLocal
....
[info] Built image hello with tags [0.1.0-SNAPSHOT]
```

Here's how to run the Dockerized app:

```
$ docker run hello:0.1.0-SNAPSHOT
Hello! The current temperature in New York is 22.7 C.
```

### Set the version

Change `build.sbt` as follows:

@@snip [example-weather-build3]($root$/src/sbt-test/ref/example-weather/changes/build3.sbt) {}

-->

### Switch scalaVersion temporarily

```
sbt:Hello> ++3.3.3!
[info] Forcing Scala version to 3.3.3 on all projects.
[info] Reapplying settings...
[info] Set current project to Hello (in build file:/tmp/foo-build/)
```

Check the `scalaVersion` setting:

```
sbt:Hello> scalaVersion
[info] helloCore / scalaVersion
[info]  3.3.3
[info] scalaVersion
[info]  3.3.3
```

This setting will go away after `reload`.

<!--
### Inspect the dist task

To find out more about `dist`, try `help` and `inspect`.

```scala
sbt:Hello> help dist
Creates the distribution packages.
sbt:Hello> inspect dist
```

To call inspect recursively on the dependency tasks use `inspect tree`.

```scala
sbt:Hello> inspect tree dist
[info] dist = Task[java.io.File]
[info]   +-Universal / dist = Task[java.io.File]
....
```

-->

### Batch mode

You can also run sbt in batch mode, passing sbt commands directly from the terminal.

```
$ sbt clean "testOnly HelloSuite"
```

**Note**: Running in batch mode requires JVM spinup and JIT each time,
so **your build will run much slower**.
For day-to-day coding, we recommend using the sbt shell
or a continuous test like `~test`.

### sbt new command

You can use the sbt `new` command to quickly setup a simple "Hello world" build.

```
$ sbt new scala/scala-seed.g8
....
A minimal Scala project.

name [My Something Project]: hello

Template applied in ./hello
```

When prompted for the project name, type `hello`.

This will create a new project under a directory named `hello`.

### Credits

This page is based on the [Essential sbt][essential-sbt] tutorial written by William "Scala William" Narmontas.
