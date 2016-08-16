// todo: write tests using the strategies described below

/*

  Two ways it's being determined a resource is above a certain size threshold:

    1) The content-length in the headers

    2) Keeping track of the total size by adding the length of each data packet received

  Strategies for testing each scenario:

    1) mock a response with the content-length set to a value greater than the maximum allowed size

    2) Set the maximum allowed size to a much smaller value in the testing environment config and then mock a response with a size greater than that small value.

*/
