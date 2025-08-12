import { createStyles, rem } from '@mantine/styles';
import { headerTheme } from '../theme/headerTheme';

export const useHeaderStyles = createStyles((theme) => ({
  outerFrame: {
    width: rem(890),
    height: rem(80),
    marginTop: rem(21),
    borderRadius: headerTheme.radii.roundHuge,
    background: headerTheme.colors.headerBg,
    border: `1px solid ${headerTheme.colors.headerBorder}`,
    boxShadow: headerTheme.shadows.header,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  innerFrame: {
    width: rem(838),
    height: rem(48),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    gap: rem(0),
  },
  logo: {
    padding: 0,
    marginRight: rem(24),
    height: rem(48),
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItem: {
    padding: headerTheme.spacing.navItem,
    fontWeight: headerTheme.font.weight,
    fontFamily: headerTheme.font.family,
    fontSize: headerTheme.font.size,
    lineHeight: headerTheme.font.lineHeight,
    letterSpacing: headerTheme.font.letterSpacing,
    color: '#303030',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: 'none',
    outline: 'none',
    transition: 'color 0.2s',
    '&:hover': {
      color: headerTheme.colors.primaryTop,
      textDecoration: 'none',
    },
    '&:active': {
      textDecoration: 'none',
    },
    '&:focus': {
      textDecoration: 'none',
      outline: 'none',
    },
  },
  ctaContainer: {
    width: rem(133),
    height: rem(48),
    borderRadius: headerTheme.radii.navItem,
    padding: rem(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
}));

export const useCreateJobButtonStyles = createStyles(() => ({
  button: {
    width: rem(123),
    height: rem(38),
    borderRadius: '999px',
    padding: headerTheme.spacing.navItem,
    whiteSpace: 'nowrap',
    background: 'linear-gradient(180deg, #A128FF 0%, #6100AD 100%)',
    color: headerTheme.colors.ctaText,
    fontWeight: headerTheme.font.weight,
    fontStyle: headerTheme.font.style,
    fontFamily: headerTheme.font.family,
    fontSize: headerTheme.font.size,
    lineHeight: headerTheme.font.lineHeight,
    letterSpacing: headerTheme.font.letterSpacing,
    border: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s, transform 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: headerTheme.shadows.ctaHover,
    },
    '&:focus': {
      outline: 'none',
      boxShadow: headerTheme.shadows.ctaFocus,
    },
  },
}));
