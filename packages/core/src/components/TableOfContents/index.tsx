import { Body2 } from '@components/Body2';
import { MenuItem } from '@components/MenuItem';
import { MenuList } from '@components/MenuList';
import React from 'react';
import { Box, BoxProps } from '@components/Box';
import { useContentsArea, TreeItem } from '@components/ContentsArea';

export interface TableOfContentsProps extends BoxProps {}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  ...rest
}) => {
  const contentsArea = useContentsArea();

  const render = (items: TreeItem[] = [], level = 0) => (
    <MenuList
      className="table-of-contents"
      sx={{ p: level > 0 ? 0 : undefined }}
    >
      {items.map((item) => (
        <Box id={item.id} key={item.id}>
          <MenuItem
            sx={{ pl: level > 0 ? level + 2 : undefined }}
            onClick={() => {
              contentsArea?.setActiveId?.(item.id);
              contentsArea?.highlightItem?.(item.id);
              item.node.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <Body2
              color={
                contentsArea?.activeId === item.id
                  ? 'info.main'
                  : 'text.primary'
              }
              fontWeight={500}
            >
              {item.title}
            </Body2>
          </MenuItem>
          {item.children.length ? render(item.children, level + 1) : <></>}
        </Box>
      ))}
    </MenuList>
  );

  return <Box {...rest}>{render(contentsArea?.treeItems)}</Box>;
};
