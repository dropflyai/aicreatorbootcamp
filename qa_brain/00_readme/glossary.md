# QA Brain — Glossary

A comprehensive glossary of testing terminology, organized by domain. All definitions align with ISTQB Foundation and Advanced Level syllabi unless otherwise noted.

---

## Core Testing Concepts

| Term | Definition | Source |
|------|-----------|--------|
| **Testing** | The process consisting of all lifecycle activities, both static and dynamic, concerned with planning, preparation, and evaluation of a component or system to determine that it satisfies specified requirements | ISTQB |
| **Checking** | The process of confirming that the software meets its requirements through mechanizable verification (as distinct from sapient testing) | Michael Bolton |
| **Verification** | Confirmation that specified requirements have been fulfilled ("Are we building the product right?") | IEEE 610 |
| **Validation** | Confirmation that the requirements for a specific intended use have been fulfilled ("Are we building the right product?") | IEEE 610 |
| **Defect** | A flaw in a component or system that can cause the component or system to fail to perform its required function | ISTQB |
| **Bug** | Informal synonym for defect | Industry |
| **Failure** | Deviation of the component or system from its expected delivery, service, or result | ISTQB |
| **Error** | A human action that produces an incorrect result (the mistake that introduces a defect) | ISTQB |
| **Quality** | The degree to which a component or system satisfies stated and implied needs of its various stakeholders | ISO 25010 |
| **Test Oracle** | A source to determine the expected result of a test case, used to compare with the actual result | ISTQB |

---

## Test Levels

| Term | Definition | Pyramid Position |
|------|-----------|-----------------|
| **Unit Test** | A test that verifies the behavior of a single unit of code (function, method, class) in isolation | Base (many, fast) |
| **Component Test** | A test that verifies the behavior of a component (may span multiple units) | Base to middle |
| **Integration Test** | A test that verifies the interaction between two or more integrated components or systems | Middle |
| **System Test** | A test that verifies the behavior of a complete, integrated system | Upper middle |
| **End-to-End Test** | A test that verifies a complete user workflow from start to finish through the entire system | Top (few, slow) |
| **Acceptance Test** | A test conducted to determine whether a system satisfies its acceptance criteria | Top |

---

## Test Types

| Term | Definition | When Used |
|------|-----------|-----------|
| **Functional Testing** | Testing that evaluates the functions that a component or system should perform | Every release |
| **Non-Functional Testing** | Testing the "how well" rather than the "what" (performance, usability, security, etc.) | Risk-dependent |
| **Regression Testing** | Testing of a previously tested program following modification to ensure defects have not been introduced | Every change |
| **Smoke Testing** | A subset of tests that cover the most important functionality to determine if the build is stable enough for further testing | Every build |
| **Sanity Testing** | Narrow, focused testing to verify that a specific function works correctly after a minor change | Quick validation |
| **Exploratory Testing** | An approach to testing where the tester simultaneously learns, designs, and executes tests | Continuous |
| **Acceptance Testing** | Formal testing with respect to user needs, requirements, and business processes | Pre-release |
| **Alpha Testing** | Testing performed at the developer's site by potential users or an independent test team | Pre-beta |
| **Beta Testing** | Testing performed by potential users at an external site not otherwise involved in development | Pre-GA |

---

## Test Design Techniques

| Term | Definition | Category |
|------|-----------|----------|
| **Equivalence Partitioning** | A test design technique that divides the input domain into classes of data from which test cases can be derived | Black-box |
| **Boundary Value Analysis** | A test design technique based on exercising the boundaries of equivalence partitions | Black-box |
| **Decision Table Testing** | A test design technique where test cases are designed to execute combinations of conditions | Black-box |
| **State Transition Testing** | A test design technique where test cases are designed to execute valid and invalid state transitions | Black-box |
| **Pairwise Testing** | A combinatorial test design technique that tests all possible discrete combinations of each pair of input parameters | Black-box |
| **Statement Coverage** | The percentage of executable statements that have been exercised by a test suite | White-box |
| **Branch Coverage** | The percentage of branches (decision outcomes) that have been exercised by a test suite | White-box |
| **MC/DC** | Modified Condition/Decision Coverage — each condition independently affects the outcome | White-box |
| **Mutation Testing** | A technique that introduces small changes (mutants) to the code to evaluate the quality of the test suite | White-box |

---

## Test Automation

| Term | Definition | Context |
|------|-----------|---------|
| **Test Double** | A generic term for any object that replaces a production object for testing purposes | Meszaros |
| **Mock** | A test double that verifies interactions (expectations about how it was called) | Meszaros |
| **Stub** | A test double that provides canned answers to calls made during the test | Meszaros |
| **Fake** | A test double that has a working implementation but takes shortcuts (e.g., in-memory database) | Meszaros |
| **Spy** | A test double that records calls for later verification | Meszaros |
| **Dummy** | A test double that is passed around but never used (fills parameter lists) | Meszaros |
| **Page Object Model (POM)** | A design pattern that creates an object repository for web UI elements, encapsulating page interactions | Selenium |
| **Fixture** | Fixed state of a set of objects used as a baseline for running tests | xUnit |
| **Arrange-Act-Assert (AAA)** | A pattern for structuring unit tests: set up, perform action, verify result | Industry |
| **Given-When-Then (GWT)** | A BDD pattern for specifying behavior: preconditions, action, expected outcome | Cucumber/BDD |
| **Test Flakiness** | A test that passes and fails intermittently without code changes | Google Testing Blog |
| **Self-Healing Test** | A test that automatically adapts to minor UI changes (e.g., locator updates) | AI Testing |

---

## Performance Testing

| Term | Definition | Unit |
|------|-----------|------|
| **Response Time** | The time from request submission to first byte or complete response | Milliseconds |
| **Throughput** | The number of transactions or requests processed per unit of time | Requests/second |
| **Latency** | The delay before a transfer of data begins following an instruction | Milliseconds |
| **Percentile (P50, P95, P99)** | A value below which a given percentage of observations fall | Milliseconds |
| **Load Testing** | Testing to evaluate system behavior under expected load conditions | — |
| **Stress Testing** | Testing to evaluate system behavior beyond expected load limits | — |
| **Soak Testing** | Testing under sustained load over an extended period to detect memory leaks and degradation | — |
| **Spike Testing** | Testing with sudden, large increases in load to evaluate system response | — |
| **SLO (Service Level Objective)** | A target value for a service level measured by an SLI | Percentage |
| **SLI (Service Level Indicator)** | A quantitative measure of some aspect of the level of service | Varies |
| **SLA (Service Level Agreement)** | A contract between provider and consumer that documents SLOs | Legal |
| **Error Budget** | The allowed amount of unreliability (1 - SLO) | Percentage |

---

## CI/CD and DevOps

| Term | Definition | Stage |
|------|-----------|-------|
| **Quality Gate** | A checkpoint in the delivery pipeline that must pass before proceeding | Pipeline |
| **Pre-commit Hook** | A script that runs before a commit is created, typically for linting and formatting | Local |
| **Continuous Integration** | The practice of merging all developer working copies to a shared mainline frequently | Build |
| **Continuous Delivery** | The ability to release changes to production at any time through automated pipelines | Deploy |
| **Canary Release** | A deployment strategy where a new version is released to a small subset of users first | Production |
| **Blue-Green Deployment** | A deployment strategy that maintains two identical production environments | Production |
| **Feature Flag** | A mechanism to enable or disable features at runtime without deployment | Runtime |
| **Shift-Left** | Moving testing and quality activities earlier in the software development lifecycle | Philosophy |
| **Shift-Right** | Extending testing and quality activities into production (monitoring, observability) | Philosophy |

---

## Quality Metrics

| Term | Definition | Formula |
|------|-----------|---------|
| **Defect Density** | The number of confirmed defects per unit of size | Defects / KLOC or Defects / Story Point |
| **Defect Escape Rate** | The percentage of defects found in production vs. total defects | Production Defects / Total Defects x 100 |
| **MTTR** | Mean Time to Recovery — average time to restore service after a failure | Sum(recovery times) / Count(incidents) |
| **MTTD** | Mean Time to Detect — average time to discover a defect or incident | Sum(detection times) / Count(defects) |
| **Test Effectiveness** | The ratio of defects found by testing to total defects | Test Defects / (Test Defects + Escaped Defects) x 100 |
| **Automation Rate** | The percentage of test cases that are automated | Automated Tests / Total Tests x 100 |
| **Code Coverage** | The percentage of code exercised by automated tests | Covered Lines / Total Lines x 100 |
| **Flaky Test Rate** | The percentage of tests that show non-deterministic behavior | Flaky Tests / Total Tests x 100 |

---

## Specialized Testing

| Term | Definition | Domain |
|------|-----------|--------|
| **Contract Testing** | Verifying that a service meets the expectations (contract) of its consumers | API |
| **Schema Validation** | Verifying that an API response matches its declared schema (OpenAPI, JSON Schema) | API |
| **WCAG** | Web Content Accessibility Guidelines — W3C standard for web accessibility | Accessibility |
| **Axe** | An accessibility testing engine that runs in browser dev tools and CI pipelines | Accessibility |
| **Device Farm** | A cloud service providing real mobile devices for testing (AWS Device Farm, BrowserStack) | Mobile |
| **Visual Regression** | Detecting unintended visual changes by comparing screenshots pixel-by-pixel or perceptually | Visual |
| **Chaos Engineering** | The discipline of experimenting on a system to build confidence in its ability to withstand turbulent conditions | Resilience |
| **Steady State** | The normal behavior of a system as defined by its business metrics | Chaos |
| **Blast Radius** | The scope of impact of a chaos experiment or failure | Chaos |
| **Property-Based Testing** | A testing approach where tests are defined by properties that should hold for all inputs, with inputs generated automatically | Formal |
| **Mutation Score** | The ratio of killed mutants to total mutants, measuring test suite effectiveness | Mutation |

---

## Acronyms

| Acronym | Full Form |
|---------|-----------|
| AAA | Arrange-Act-Assert |
| A11y | Accessibility |
| API | Application Programming Interface |
| BDD | Behavior-Driven Development |
| CI | Continuous Integration |
| CD | Continuous Delivery / Continuous Deployment |
| DORA | DevOps Research and Assessment |
| E2E | End-to-End |
| GWT | Given-When-Then |
| ISTQB | International Software Testing Qualifications Board |
| KLOC | Thousands of Lines of Code |
| MC/DC | Modified Condition/Decision Coverage |
| MTTR | Mean Time to Recovery |
| MTTD | Mean Time to Detect |
| POM | Page Object Model |
| SLA | Service Level Agreement |
| SLI | Service Level Indicator |
| SLO | Service Level Objective |
| TDD | Test-Driven Development |
| UAT | User Acceptance Testing |
| WCAG | Web Content Accessibility Guidelines |

---

**This glossary is authoritative within the QA Brain. All modules use these definitions.**
