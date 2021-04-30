import styled, { css } from "styled-components"
import SearchResult from "./search-result"

const Popover = css`
  max-height: 80vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 100%;
  margin-top: 0.5em;
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 1em;
  border-radius: 2px;
  background: ${({ theme }) => theme.background};
`;

export default styled(SearchResult)`
  display: ${props => (props.show ? `block` : `none`)};
  ${Popover}

  .HitCount {
    display: flex;
    justify-content: flex-end;
  }

  .Hits {
    ul {
      list-style: none;
      margin-left: 0;
      padding: 12px 12px 0 12px;
      margin-bottom: 0;
    }

    li.ais-Hits-item {

      a {
        font-size: 15px;
        h4 {
          color: indigo;
          line-height: 20px;
          height: 20px;
          margin: 0;
          border-bottom: 1px solid #e4d1d1;
        }
      }
      
      .ais-Snippet {
        font-size: 13px;
        display: block;
        word-break: break-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .ais-PoweredBy {
    font-size: 80%;
    height: 40px;
    line-height: 40px;
    display: inline;
    float: right;

    svg {
      width: 70px;
      position: relative;
    top: 10px;
    }
  }
`