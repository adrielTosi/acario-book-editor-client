import PillarLayout from "components/layout/PillarLayout";
import { H1, H2, H3, H4, H5, H6 } from "components/typography/Heading";
import { Text } from "components/typography/Text";
import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import theme from "styles/theme";

export default function Showcase() {
  return (
    <PillarLayout>
      <div className="columns is-multiline">
        <div className="column is-6">
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <H3 color={theme.colors.accent_1_700}>Heading 3</H3>
          <H4>Heading 4</H4>
          <H5>Heading 5</H5>
          <H6>Heading 6</H6>
        </div>
        <div className="column is-6">
          <Text type="large" color={theme.colors.accent_2_700}>
            Text Large -- Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eaque
            placeat, officia exercitationem voluptatem nobis corrupti fugiat id iste optio aliquid
            excepturi cumque ad consequuntur incidunt ipsum iusto molestias culpa.
          </Text>
          <Text>
            Text Regular -- Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            laboriosam, quidem veritatis atque ex voluptatem deserunt. Nam a cumque eaque molestiae
            quod hic exercitationem sit commodi velit, dolorum nobis cum?
          </Text>
          <Text type="small">
            Text Small -- Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime eligendi
            sapiente accusantium, non ea voluptate cum vitae nulla dolorum omnis autem sit debitis
            numquam natus suscipit velit cumque minima. Laudantium?
          </Text>
        </div>
        <div className="column is-6">
          <Box borderRadius="8px" border={`1px solid ${theme.colors.comp_outline}`} padding="8px">
            Box Utility Component
          </Box>
          <Button variant="secondary" mr="4px">
            Test
          </Button>
          <Button variant="secondary" disabled mr="4px">
            Test
          </Button>
          <Button variant="secondary" p="4px 32px">
            Test
          </Button>
          <Button variant="secondary" p="4px 32px" pill>
            Pill
          </Button>
          <div>
            <Button mr="4px">Test</Button>
            <Button disabled mr="4px">
              Test
            </Button>
            <Button p="4px 32px">Test</Button>
            <Button p="4px 32px" pill>
              Pill
            </Button>
          </div>
        </div>
      </div>
    </PillarLayout>
  );
}
