import React, {useMemo} from 'react';
import {useColorMode, IconButton, Tooltip} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';

function ColorModeSwitcher() {

  const {colorMode, toggleColorMode} = useColorMode();
  const toolTipLabel = useMemo(() =>
    colorMode === 'light' ? 'Dark Mode' : 'Light Mode', [colorMode]);

  return (
    <Tooltip hasArrow label={toolTipLabel}>
      <IconButton aria-label="color-switcher"
                  icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
      />
    </Tooltip>
  );
}

export default ColorModeSwitcher;