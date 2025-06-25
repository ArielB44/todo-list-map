import styled from "styled-components";

export default function NavBar() {
    const Bar = styled.nav`
        font-size: 25px;
        background-color: grey;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        height: 80px
    `

    return (
        <Bar>TODO LIST MAP</Bar>  
    )
}