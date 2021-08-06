import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormField,
  IconField,
  InputIcon,
  IconSpacer,
  InputField,
  IconFieldRight,
  RightInputIcon,
} from "../../elements/Input.element";
import {
  Navbar,
  NavTitle,
  NavActions,
  NavMenu,
  IconButton,
  NavIcon,
  Tooltip,
  SearchFieldMax1000,
  IconButtonSearch,
} from "../../elements/nav.element";
import SearchIcon from "../../icons/nav/search.png";
import NotifOutline from "../../icons/nav/bell-o.png";
import ChatOutline from "../../icons/nav/chat-o.png";
import UserIconOutline from "../../icons/nav/ua-o.png";
import CloseIcon from "../../icons/nav/close.png";
import SearchIconF from "../../icons/nav/search-f.png";

interface AppbarProps {}

const Appbar: React.FC<AppbarProps> = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <Navbar>
      <NavTitle>
        <h1>authboilerplate</h1>
      </NavTitle>

      <NavActions>
        <FormField>
          <IconField>
            <InputIcon src={SearchIcon} alt="search" />
          </IconField>
          <IconSpacer />
          <InputField aa_noBorder placeholder="search..." />
        </FormField>
      </NavActions>

      <NavMenu>
        <IconButton as={Link} to="/login">
          <NavIcon src={NotifOutline} alt="user" />
          <Tooltip className="tp">Notification</Tooltip>
        </IconButton>
        <IconButton as={Link} to="/register">
          <NavIcon src={ChatOutline} alt="user" />
          <Tooltip className="tp">Chats</Tooltip>
        </IconButton>
        <IconButton as={Link} to="/forgot-password">
          <NavIcon src={UserIconOutline} alt="user" />
          <Tooltip className="tp">Account</Tooltip>
        </IconButton>
        <IconButtonSearch onClick={() => setShowSearch(true)}>
          <NavIcon src={SearchIconF} alt="search" />
          <Tooltip className="tp">Search</Tooltip>
        </IconButtonSearch>
        {showSearch && (
          <SearchFieldMax1000>
            <FormField>
              <IconField onClick={() => console.log("searching...")}>
                <InputIcon src={SearchIcon} alt="search" />
              </IconField>
              <IconSpacer />
              <InputField
                aa_noBorder
                autoFocus
                aa_onFocusShadow
                placeholder="search..."
              />
              <IconFieldRight>
                <RightInputIcon
                  src={CloseIcon}
                  alt="close"
                  onClick={() => setShowSearch(false)}
                />
              </IconFieldRight>
            </FormField>
          </SearchFieldMax1000>
        )}
      </NavMenu>
    </Navbar>
  );
};

export default Appbar;
