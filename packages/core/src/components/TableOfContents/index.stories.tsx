import { Body2 } from '@components/Body2';
import { Box } from '@components/Box';
import { ContentsArea, ContentsClass } from '@components/ContentsArea';
import { Stack } from '@components/Stack';
import { TableOfContents } from '@components/TableOfContents';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/TableOfContents',
  component: TableOfContents,
};

export default meta;

type Story = StoryObj<typeof TableOfContents>;

export const Overview: Story = {
  render: () => {
    return (
      <ContentsArea>
        <Stack direction="row">
          <Stack
            p={1}
            spacing={2}
            width={400}
            height={200}
            border={1}
            borderColor="secondary.main"
            overflow="auto"
            display="block"
          >
            <Box
              className={ContentsClass.Item}
              border={1}
              borderColor="primary.main"
              p={1}
              height={200}
            >
              <Body2 className={ContentsClass.ItemTitle} fontWeight={500}>
                Item 1
              </Body2>
              <Box
                className={ContentsClass.Item}
                border={1}
                borderColor="primary.main"
                p={1}
              >
                <Body2 className={ContentsClass.ItemTitle} fontWeight={500}>
                  Item 1.1
                </Body2>
              </Box>
            </Box>
            <Box
              className={ContentsClass.Item}
              border={1}
              borderColor="primary.main"
              p={1}
              height={200}
            >
              <Body2 className={ContentsClass.ItemTitle} fontWeight={500}>
                Item 2
              </Body2>
            </Box>
            <Box
              className={ContentsClass.Item}
              border={1}
              borderColor="primary.main"
              p={1}
              height={200}
            >
              <Body2 className={ContentsClass.ItemTitle} fontWeight={500}>
                Item 3
              </Body2>
            </Box>
            <Box
              className={ContentsClass.Item}
              border={1}
              borderColor="primary.main"
              p={1}
              height={200}
            >
              <Body2 className={ContentsClass.ItemTitle} fontWeight={500}>
                Item 4
              </Body2>
            </Box>
          </Stack>
          <TableOfContents />
        </Stack>
      </ContentsArea>
    );
  },
};
