import { styled } from '@mui/material';
import { getTime } from '@utils/getTime';
import { sleep } from '@utils/sleep';
import React, {
  RefObject,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export type TreeItem = {
  id: string;
  title: string;
  children: TreeItem[];
  node: Element;
  titleNode: Element | null;
};

export type ContentsAreaHandle = {
  refreshTableOfContents: () => void;
};

export interface ContentsAreaProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'> {}

const ContentsAreaContext = createContext<{
  contentRef: RefObject<HTMLDivElement>;
  treeItems: TreeItem[];
  activeId: string;
  highlightItem: (id: string) => void;
  setActiveId: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const useContentsArea = () => useContext(ContentsAreaContext);

export enum ContentsClass {
  ScrollableArea = 'content-scrollable-area',
  Item = 'content-item',
  ItemTitle = 'content-item-title',
}

const TREE_ITEMS_SELECTOR = `.${ContentsClass.Item}`;
const ITEM_TITLE_SELECTOR = `.${ContentsClass.ItemTitle}`;
const ACTIVE_ITEM_CLASS = 'active-item';
const HIGHLIGHT_ITEM_TRANSITION_CLASS = 'highlight-item-transition';
const HIGHLIGHT_ITEM_CLASS = 'highlight-item';

const Div = styled('div')(({ theme }) => ({
  [`&.${HIGHLIGHT_ITEM_CLASS} .${ACTIVE_ITEM_CLASS}`]: {
    color: theme.palette.info.main,
    outline: `1px solid ${theme.palette.info.main}`,
  },
  [`&.${HIGHLIGHT_ITEM_CLASS}.${HIGHLIGHT_ITEM_TRANSITION_CLASS} .${ACTIVE_ITEM_CLASS}`]:
    {
      transition: 'color 1s linear, outline-color 1s ease',
      color: 'inherit',
      outline: `1px solid transparent`,
    },
}));

export const ContentsArea = forwardRef<ContentsAreaHandle, ContentsAreaProps>(
  ({ ...rest }, ref) => {
    const store = useRef<{
      treeItems: TreeItem[];
      highlightHandler?: {
        cancelled: boolean;
        cancel: () => void;
        run: () => Promise<void>;
      };
    }>({ treeItems: [] });
    const [activeId, setActiveId] = useState('item-0');
    const [render, setRender] = useState<number>();
    const [treeItems, setTreeItems] = useState<TreeItem[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({ refreshTableOfContents }));

    const refreshTableOfContents = () => setRender(getTime());

    const selectNextChildren = (element: Element, selector: string) => {
      const nodes = element.querySelectorAll(selector);
      const result = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const childNodesLength = node.querySelectorAll(selector).length;

        if (childNodesLength) {
          i = i + childNodesLength;
        }

        result.push(node);
      }

      return result;
    };

    const onItemMouseEnter = useCallback((event: Event) => {
      setActiveId((event.target as Element).id);
    }, []);

    const removeHighlightClass = () => ({
      cancelled: false,
      cancel: function () {
        this.cancelled = true;
      },
      run: async function () {
        await sleep(1020);
        if (this.cancelled) return;
        contentRef?.current?.classList?.remove(HIGHLIGHT_ITEM_CLASS);
        contentRef?.current?.classList?.remove(HIGHLIGHT_ITEM_TRANSITION_CLASS);
      },
    });

    const highlightItem = useCallback(async (id: string) => {
      store.current.highlightHandler?.cancel();
      store.current.highlightHandler = removeHighlightClass();
      const item = contentRef.current?.querySelector(`#${id}`);
      const titleItems =
        contentRef?.current?.querySelectorAll(ITEM_TITLE_SELECTOR);

      titleItems?.forEach((item) => {
        item.classList.remove(ACTIVE_ITEM_CLASS);
      });

      const titleItem = item?.querySelector(ITEM_TITLE_SELECTOR);

      (titleItem as HTMLElement)?.classList?.add(ACTIVE_ITEM_CLASS);
      contentRef?.current?.classList?.add(HIGHLIGHT_ITEM_CLASS);
      contentRef?.current?.classList?.remove(HIGHLIGHT_ITEM_TRANSITION_CLASS);
      await sleep(1000);
      contentRef?.current?.classList?.add(HIGHLIGHT_ITEM_TRANSITION_CLASS);
      store.current.highlightHandler?.run();
    }, []);

    const buildTreeItems = (
      element: Element,
      treeItem?: TreeItem,
      parentId?: string
    ) => {
      const items = selectNextChildren(element, TREE_ITEMS_SELECTOR);
      const treeItems = treeItem?.children || store.current.treeItems;

      items.forEach((item, index) => {
        const id = parentId ? `${parentId}-${index}` : `item-${index}`;
        item.id = id;

        item.removeEventListener('mouseenter', onItemMouseEnter);
        item.addEventListener('mouseenter', onItemMouseEnter);

        const titleNode = item.querySelector(ITEM_TITLE_SELECTOR);
        const title = titleNode?.textContent || '';
        treeItems.push({ id, title, children: [], node: item, titleNode });

        if (selectNextChildren(item, TREE_ITEMS_SELECTOR).length) {
          buildTreeItems(item, treeItems[index], id);
        }
      });

      return treeItems;
    };

    useEffect(() => {
      if (contentRef?.current) {
        store.current.treeItems = [];
        setTreeItems(buildTreeItems(contentRef.current));
      }
    }, [render]);

    return (
      <ContentsAreaContext.Provider
        value={{ contentRef, treeItems, activeId, setActiveId, highlightItem }}
      >
        <Div ref={contentRef} {...rest} />
      </ContentsAreaContext.Provider>
    );
  }
);
