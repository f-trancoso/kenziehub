import  styled  from 'styled-components'

export const StyledListItem = styled.li`
    width: 93%;
    height: 49px;
    box-sizing: border-box;

    border-radius: 6px;

    background-color: #121214;
    list-style: none;

    display: flex;
    justify-content: space-between;
    padding: 13px 23px;
    margin-bottom: 10px;

    h4 {
        color: white;
        font-size: 14px;
        font-weight: 700;
        margin: 0px;
    }

    div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    div span {
        font-size: 12px;
        color: #868E96;
        margin-right: 30px;
    }

    div svg {
        margin-top: 3px;
        color: rgba(255, 255, 255, 0.5);
        transition: 300ms;
        cursor: pointer;
    }
`