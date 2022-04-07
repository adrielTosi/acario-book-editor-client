import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: 'Work Sans', sans-serif; 
   }
   #root{
       margin:0 auto;
   }
   body {
       color: ${({ theme }) => theme.colors.contrast_high};
       background-color: ${({ theme }) => theme.colors.bg_comp_1}
   }
`;
