import styled from 'styled-components'

export const GlobalButton = styled.button`
    width: ${ props => `${props['myWidth']}`};
    height: 42px;

    margin-top: 10px;
    border-radius: 4px;
    border: none;

    color: white;
    font-size: 13px;
    background-color: ${props => `#${props['myColor']}`};

    transition: 300ms;

    opacity: 88%;

    &:hover {
        opacity: 100%;
        cursor: pointer;      
    }
`
//width: ${ props => `${props['myWidth']}`};

//background-color: ${props => `#${props['myColor']}`};