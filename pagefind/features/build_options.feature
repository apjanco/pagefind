Feature: Build Options

    @skip
    Scenario: Settings can be pulled from configuration files

    @skip
    Scenario: Settings can be pulled from commandline flags

    @skip
    Scenario: Settings can be pulled from environment variables

    Scenario: Source folder can be configured
        Given I have a "my_website/index.html" file with the content:
            """
            <p data-url>
            </p>
            """
        Given I have a "my_website/cat/index.html" file with the content:
            """
            <body>
                <h1>world</h1>
            </body>
            """
        When I run my program with the flags:
            | --source my_website |
        Then I should see "Running Pagefind" in stdout
        Then I should see the file "my_website/_pagefind/pagefind.js"
        When I serve the "my_website" directory
        When I load "/"
        When I evaluate:
            """
            async function() {
                let pagefind = await import("/_pagefind/pagefind.js");

                let results = await pagefind.search("world");

                let data = await results[0].data();
                document.querySelector('[data-url]').innerText = data.url;
            }
            """
        Then The selector "[data-url]" should contain "/cat/"

    Scenario: Output path can be configured
        Given I have a "public/index.html" file with the content:
            """
            <p data-url>
            </p>
            """
        Given I have a "public/cat/index.html" file with the content:
            """
            <body>
                <h1>world</h1>
            </body>
            """
        When I run my program with the flags:
            | --bundle_dir _search |
        Then I should see "Running Pagefind" in stdout
        Then I should see the file "public/_search/pagefind.js"
        When I serve the "public" directory
        When I load "/"
        When I evaluate:
            """
            async function() {
                let pagefind = await import("/_search/pagefind.js");

                let results = await pagefind.search("world");

                let data = await results[0].data();
                document.querySelector('[data-url]').innerText = data.url;
            }
            """
        Then The selector "[data-url]" should contain "/cat/"

    @skip
    Scenario: Selector used for indexing can be configured
