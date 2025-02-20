import { Meta, StoryObj } from '@storybook/react';
import { I18nProvider, useI18n } from '@components/I18nProvider';
import { Stack } from '@components/Stack';
import { Typography } from '@components/Typography';

const meta: Meta<typeof I18nProvider> = {
  title: 'I18n/I18nProvider',
  component: I18nProvider,
};

type Story = StoryObj<typeof I18nProvider>;
export default meta;

const data = {
  description: 'Text in english',
  address: 'Street 123',
  translations: {
    en: { description: 'Text in english' },
    es: { description: 'Texto en español' },
  },
};

export const Overview: Story = {
  render: () => {
    const { t, tObj } = useI18n();

    return (
      <Stack spacing={2}>
        <Typography variant="body1">{t('yes')}</Typography>
        <Typography variant="body1">{t('no')}</Typography>
        <Typography variant="body1">{t('accept')}</Typography>
        <Typography variant="body1">{t('cancel')}</Typography>
        <Typography variant="body1">{t('english')}</Typography>
        <Typography variant="body1">{t('spanish')}</Typography>
        <Typography variant="body1">
          {tObj(data, 'description', { translationsKey: 'translations' })}
        </Typography>
        <Typography variant="body1">{tObj(data, 'address')}</Typography>
      </Stack>
    );
  },
};
