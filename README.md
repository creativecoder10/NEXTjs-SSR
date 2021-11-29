## About Applicatioj 

This is a FE application built on NEXT.js with a mock end point. The application is simple demonstration of server side rendering skills along with error handling 

## The Task

The task is to complete a mock Search Results Page.

The project includes some mock designs, an already working single page application, and an API endpoint which returns mock results.

You should only spend 2 hours maximum on this test - just complete as much as you can in that time. It is absolutley not neccessary to finish every part of the task, so please don't feel like you need spend more time than you have available.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You’ll need Node.js version `10.13` or later, a text editor and terminal app for this task.

- Either clone this repository or download the `gtau-fe-test.zip` and extract the contents
- Navigate to the `gtau-fe-test` directory in your terminal
- Install the dependencies `npm install`
- Start the development server `npm run dev`

Open [http://localhost:3000/listings](http://localhost:3000) with your browser and you will see the listings of cars 

You can also open [http://localhost:3000/api/listings](http://localhost:3000/api/listings) with your browser and see the response from the API endpoint (the results are a randomised number of listings, and order).

## The task Requirements/ Acceptance criteria is:

Complete the `Listings` component(s) so that it correctly render the results returned from the API endpoint.

- The layout should be responsive and match the mocks (3 columns on desktop, 2 on tablet, 1 on mobile).
- The listings should visually match the mocks as closely as possible.
- The title of the listing should be truncated to a single line. 
- The description of the listing should be truncated to 3 lines.
- The price should be formatted to be human readable.
- The two buttons on each listing do not need to do anything when clicked except log a message to the console with the format `[action]: [title]`, e.g: `Reply: 2007 Ferrari Spider` or `View: 2007 Ferrari Spider`.
- The page only needs to work in the *latest version of Chrome*.
- Do not include any extra dependencies. The project has everything you need to complete it.
- The only two files you need to edit are `components/Listings.js` and `public/css/listings.css`. There is no need to edit anything else.

## How did I start?

Review the mocks in `design-mocks` directory. There is a mock design for desktop, tablet and mobile.

The logical order to complete the tasks are:

-   Retrieve results from the API endpoint.
-   Complete the logic and responsive layout for the parent `Listings` component.
-   Complete the logic and layout for the singular `Listing` component.
-   Complete the logic for the `formatAsCurrency` utility.

You do not need to use anything but plain ol' CSS for styling. There are some root level [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) declared in `public/css/variables.css` which you can, and should, use to help save you time.

## Tips to understand the dev process 

-   Even though the API is a mock, treat it as you would a production API. What happens when there are no results? Or the request fails?
-   The API server is temperamental - 10% of the time it will return an error, and may take up to 3 seconds to return a response. Make sure the Frontend can handle it!
-   This isn't _just_ a Javascript test. The HTML structure of your component and the CSS layout are equally important.
-   Dont try to do too much! A simple, clean solution that _works_ is looked at more favourably than an complex one that does not.
