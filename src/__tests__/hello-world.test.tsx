import {render, screen} from "@testing-library/react"

it("should test", ()=>{
    expect(1).toBe(1);
})

it("should test components", ()=>{
    render(<p>Hello world</p>);
    expect(screen.getByRole('paragraph')).toHaveTextContent("Hello world");
})