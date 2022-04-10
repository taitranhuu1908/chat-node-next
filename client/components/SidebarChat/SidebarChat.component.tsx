import { Box, Card, CardContent, Stack, Typography, Tooltip, List, InputBase } from "@mui/material";
import React, {useEffect, useState} from "react";
import styles from "../../styles/SidebarChat.module.scss";
import GroupsIcon from "@mui/icons-material/Groups";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import ItemChatComponent from "./ItemChat.component";
import {useAppSelector} from "../../app/hook";
import {RootState} from "../../app/store";
import {PRIVATE_ROOM} from "../../app/models/Room";
import {IUser} from "../../app/models/User";
// import ModalCreateRoomComponent from "./ModelCreateRoom.component";

const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: "black",
    backgroundColor: "#e6e6e6",
}));

const InputSearch = styled(InputBase)(() => ({
    backgroundColor: "#ebebeb",
    padding: 6,
    width: "100%",
    borderRadius: 4,
    color: "black",
    fontSize: "18px",
}));

const SidebarChatComponent = () => {
    const [openCreateRoom, setOpenCreateRoom] = useState(false);
    const {user} = useAppSelector((state: RootState) => state.userSlice);

    return (
        <Card variant="outlined" className={styles.root}>
            <CardContent className={styles.content}>
                <Box className={styles.cardHeader}>
                    <Typography className={styles.cardHeaderTitle}>Chats</Typography>
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="New Group" placement="top">
                            <ColorButton onClick={() => setOpenCreateRoom(true)}>
                                <GroupsIcon />
                            </ColorButton>
                        </Tooltip>
                        {/*<ModalCreateRoomComponent user={{}} open={openCreateRoom} setOpen={setOpenCreateRoom} users={{}}/>*/}
                        <Tooltip title="New Chat" placement="top">
                            <ColorButton>
                                <MessageOutlinedIcon />
                            </ColorButton>
                        </Tooltip>
                    </Stack>
                </Box>
                <Box className={styles.cardSearch}>
                    <InputSearch placeholder="Search" />
                </Box>
                <List className={styles.list}>
                    {user.rooms.map((room, index) => {
                        if (room.room_type === PRIVATE_ROOM) {
                            const userDiff: IUser = room.members.filter(u => u._id !== user._id)[0];
                            return (
                                <ItemChatComponent key={index} avatar={userDiff.avatar} name={userDiff.full_name} id={room._id}/>
                            )
                        } else {
                            return (
                                <ItemChatComponent key={index} avatar={room.avatar} name={room.name} id={room._id}/>
                            )
                        }
                    })}
                </List>
            </CardContent>
        </Card>
    );
};

export default SidebarChatComponent;