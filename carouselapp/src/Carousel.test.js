import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("should render", function(){
  render(<Carousel />);
});

it("should match snapshot", function(){
  const {asFragment} = render(<Carousel/>);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it('Left arrow should not appear on render, but appear and work after right click', function(){
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  expect(queryByTestId('left-arrow')).not.toBeInTheDocument();
  //move forward one
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  expect(queryByTestId('left-arrow')).toBeInTheDocument();
  //move back one
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);
  //expect that the page consists of first image data 
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})

it('Right arrow dissapears ', function(){
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  expect(queryByTestId('left-arrow')).not.toBeInTheDocument();
  //move forward one
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  expect(queryByTestId('left-arrow')).toBeInTheDocument();
  //move forward again
  fireEvent.click(rightArrow);
  // expect right arrow to be hidden
  expect(queryByTestId('right-arrow')).not.toBeInTheDocument();
})