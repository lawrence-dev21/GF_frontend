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
1. Create the schools form
	a. Add a school
		- get the list of districts
			- Create a list of districts

		- get the list of locations > could be an enumerator. Gotta ask first.

	b. Display a school
School users should be able to upload content
2. Login as a school user and add edit your school information.



Central Province
Districts of Central Province Zambia
