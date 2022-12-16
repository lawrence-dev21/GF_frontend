# GlobalFund MIS

The Global Fund MIS was developed by the the Ministry of Education and Smart Zambia Institute.
The System includes: 
	- User Management
	- School Management
	- PDF Upload and viewing
	- 




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
1. Dashboard

2. Beneficiary management
	a. View Beneficiary
	b. View Beneficiary Payments
