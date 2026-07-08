const APP = {
    name: "OSINT Search Engine Pro",
    version: "2.0.0",
    author: "Roni Lachmi"
};

const SEARCH_TYPES = {
    email: {
        name: "Email",
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        name: "Phone",
        regex: /^[0-9+\-\s()]{7,}$/
    },
    ip: {
        name: "IP Address",
        regex: /^(\d{1,3}\.){3}\d{1,3}$/
    },
    domain: {
        name: "Domain",
        regex: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    username: {
        name: "Username",
        regex: /^[a-zA-Z0-9._-]{3,}$/
    },
    name: {
        name: "Name",
        regex: /.+/
    }
};

const CATEGORIES = [
{
title:"🌐 מנועי חיפוש",
id:"search",
enabled
