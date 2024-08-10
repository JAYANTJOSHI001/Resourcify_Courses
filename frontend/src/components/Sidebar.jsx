import {Flex, Box, HStack, Button, Spacer, Heading,Text, List, ListItem, ListIcon} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { AtSignIcon, CalendarIcon , EditIcon} from "@chakra-ui/icons"

export default function Sidebar(){
  return (
    <List spacing={4}>
        <ListItem>
            <NavLink to="/">
                <ListIcon as={CalendarIcon} color="white"  />
                <Text color="white">Dashboard</Text>
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/Create">
                <ListIcon as={EditIcon} color="white"  />
                <Text color="white">New Task</Text>
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to="/Profile">
                <ListIcon as={AtSignIcon} color="white"  />
                <Text color="white">Profile</Text>
            </NavLink>
        </ListItem>
    </List>
  )
}