<!--
SPDX-FileCopyrightText: Ali Sajid Imami

SPDX-License-Identifier: MIT
-->

# Security Assurance Case for GitHub Action

## 1. Introduction

This document provides a comprehensive security assurance case for the GitHub
Action developed by Ali Sajid Imami. The action takes two numeric inputs
(`minimum` and `maximum`), waits for a random amount of time between the two
values, and outputs the duration waited. The assurance case ensures the action
meets security best practices and mitigates potential risks.

## 2. Security Objectives

- **Input Validation:** Prevent injection attacks and incorrect input handling.
- **Code Integrity and Authenticity:** Ensure the code executes as intended without unauthorized modifications.
- **Dependency Management:** Mitigate risks from third-party dependencies.
- **Execution Control:** Prevent excessive execution times or resource exhaustion.
- **Error Handling and Reporting:** Ensure failures are reported appropriately without leaking sensitive information.
- **Secure Deployment and Usage:** Ensure GitHub Action runs securely within workflows.

## 3. Security Threat Analysis

### 3.1. Input Validation Threats

- **Threat:** Malicious input values causing unintended execution behavior.
- **Mitigation:**
    - The code validates that `minimum` and `maximum` inputs are numbers.
    - Ensures `minimum` is less than `maximum`.
    - Enforces an upper limit of 100 seconds to prevent excessive wait times.

### 3.2. Code Integrity and Authenticity

- **Threat:** Unauthorized modifications to the GitHub Action code.
- **Mitigation:**
    - Ensures code integrity by using GPG signed commits.
    - Ensures release integrity by signing tags.
    - Recommends users pin the action version in workflows.

### 3.3. Dependency Management

- **Threat:** Compromised dependencies introducing security vulnerabilities.
- **Mitigation:**
    - Uses `@actions/core`, a trusted GitHub package.
    - Developer dependencies are vetted independently.
    - Uses renovate bot to ensure timely updates for any security vulnerability.
    - Regular lockfile updates to mitigate known vulnerabilities.

### 3.4. Execution Control and Resource Exhaustion

- **Threat:** Excessive wait times or resource exhaustion due to large input values.
- **Mitigation:**
    - Limits maximum wait time to 100 seconds.
    - Uses `setTimeout` to schedule execution without blocking the event loop.
    - Ensures the action runs in an isolated GitHub Actions environment.

### 3.5. Error Handling and Reporting

- **Threat:** Unhandled exceptions leading to undefined behavior.
- **Mitigation:**
    - Uses `try-catch` block to handle errors gracefully.
    - Reports failures via `core.setFailed(error.message)`.
    - Avoids leaking internal stack traces to prevent information disclosure.

### 3.6. Secure Deployment and Usage

- **Threat:** Unauthorized usage or unexpected behavior when used in GitHub workflows.
- **Mitigation:**
    - Encourages using the major version (such as `@v2` version) tag to avoid breaking changes.
    - Implements least privilege by not requiring any permissions.
    - Recommends limiting the workflow permissions to minimize exposure.

## 4. Security Recommendations

- **Version Pinning:** Use `AliSajid/random-wait-action@v2` to ensure a stable and tested version.
- **Dependency Updates:** Regularly update dependencies and run security audits.
- **GitHub Actions Permissions:** Restrict workflow permissions to the minimum required.
- **Code Reviews:** Conduct periodic security reviews before merging changes.

## 5. Conclusion

This security assurance case outlines the potential risks associated with the GitHub Action and the corresponding mitigation. By following these best practices, users can confidently integrate the action into their workflows while maintaining a secure execution environment.
