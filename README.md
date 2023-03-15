# GlobalFund MIS

The Global Fund MIS was developed by the the Ministry of Education and Smart Zambia Institute.

The System includes: 
	- User Management
	- School Management
	- PDF Upload and viewing

The general flow for the user experience in described as being in tabular format.

The users will eventually require a CSE management area, in which the UX can be pushed to its limits
while offering simplicity.


School Management
School Dashboard
Student Enrollment
Student Attendance

Beneficiary Management
Beneficiary Enrollment
Beneficiary Engagment

CSE Management
CSE Dashboard 
CSE Enrollment


# API Documentation


- This document lays out the current API in the fake db in alignment to what is expected the system to use.


## Users

```
GET api/users { 
	id
	firstName
	lastName
	email
	role
	institution
}
```

```
POST api/users/add { 
	firstName
	lastName
	email
	role
	institution
}
```

## Schools

```
GET api/schools {
	id
	emisNumber
	district
	name
	location
}
```


```
POST api/schools/add {
	emisNumber
	districtId
	name
	locationId
}
```


## District

```
GET api/districts {
	id
	name
	province
}
```

## Provice

```
GET api/provinces {
	id
	name
} 
```


## Modules


```
GET api/modules {
	id
	title
	description
	category
}
```


```
POST api/modules/add {
	title
	description
	file
	categorId
}
```

## Category

```
GET api/categories {
	id
	name
}
```

## TODO
1. User Get Route
	Find out what parameters we need

2. User Post Route


3. Dashboard

4. Beneficiary management
	a. View Beneficiary
	b. View Beneficiary Payments

