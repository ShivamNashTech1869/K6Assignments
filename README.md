# K6 Assignments

This repository contains assignments related to performance testing using K6, a modern load testing tool. Each assignment focuses on different aspects of load testing and performance measurement.

## Table of Contents

- [Assignment 1](./K6Assignment-1.js):     Create a k6 project.
    Install and configure k6 on your local machine.
    Write a performance test script for an API. Dummy apis are available in a multitude, you may use any easily available APIs.
    Configure Virtual Users.
    Create the load profile in ramp-up and ramp-down fashion.
    Along with the built-in metrics, you need to create a new trend on your own. You may use any name of the trend as per your choice and it should be logging some sort of statistics.
- [Assignment 2](./K6Assignment-2.js):     You may use the k6 project that you used in assignment 1.
    This time, the ask is to put assertions and checks in the script.
    There should be valid assertions applied to the test script.
    Also, you need to add thresholds in the scripts as well.

## Prerequisites

Before running the K6 assignments, ensure that you have the following prerequisites:

- [K6](https://k6.io/docs/getting-started/installation/): Install K6 on your local machine.

## Instructions

### 1. Clone the repository to your local machine:

     git clone https://github.com/shivamknoldus1869/K6Assignments.git

### 2.Navigate to the assignments folder:

     cd Assignments

### 3.Run the K6 test:
  #### if Assignment-1
      k6 run K6Assignment-1.js
  #### if Assignment-2
      k6 run K6Assignment-2.js
  This will execute the K6 test script using the default configuration.
 ### 4.Once the test is completed, K6 will provide detailed test results, including metrics such as response time, throughput, and error rate. The results will be displayed in the terminal output.
Example result output:

... K6 test execution logs ...

✓ Test completed

███ LoadTest Summary ███
  Scenarios launched: 10
  Scenarios completed: 10
  Requests executed: 100
  RPS: 5.5
  Test duration: 18s
  ...
 ## Authors

      Shivam Singh
