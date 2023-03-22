



1. Pages
    - Login Page
        - User must be able to login with their txin and password
        err.1: Expired access tokens are not removed from the browser leading to an infinite loop of 401 errors.
        Business rules: 
        1.  if a token is in the local storage
                - clear the token from the local storage to refresh the token
        
        2. reduce the jwt auth to a 10 minutes -> create a refresh token feature
        3. put an eye on the password to allow self verification of password entered
        4. Convert this field to accept the both NRC and Birth certificate number and TSC and if possible it should have intelligent validation to realise what has been entered in the field
        5. password change when user first log in
            5.1 add password confirmation when creating new password and both should have an eye to allow user to see thier input

    - Forgot password page
        err.1: Forget password is not working 
        User Flow
            1. User selects forgot password from the login page
            2. User enters their identifier(email/username/txin)
                2.1 If the user exists:
                    2.1.2 A notification of completion is displayed with the message "Your password has been changed successfully".
                    2.1.3 User is redirected to the login page.
                2.2 If the user does not exist:
                    2.2.1 An error is displayed with the message "No such user exists in the system"


    - Dashboard
        * Dummy data for the charts
        err.1: Level based data is not working
    - User Management
        * To be able to view the users within a users work area 
        - Users Table
            - View Single User Page
            Business Rules
                add excel to export
        - User Form
            - Editing Users
                - You may want to edit the user with the same form
            - Adding a new user
                User Flow
                    1. User selects add user
                    2. User enters the following fileds
                        a. username
                            text filed                        
                        b. email
                            text filed                        
                        c. password
                            pasword filed                        
                        d. firstname
                            text filed                        
                        e. lastname
                            text filed                        
                        f. date of birth
                            date filed                        
                            - learners only
                        g. nrc
                            text filed                        
                            - Super Admins
                            - Teachers
                        h. gender
                            radio field
                        i. job position
                            select field
                        j. institution
                            select field
                        h. role
                            select field
                        i. mobile
                            text filed                        
                    3. Users selects the "Submit" button
                    4. A preview modal is displayed with the user information:
                        4.1 User selects the "Submit" button
                            4.1.1 User is redirected to the users table
                        4.2 User selects the "Cancel" button
                            4.2.1 Modal closes revealing the User form
                    

            Business Rules:
                - The entry field for date of birth should only appear if the role is learner
                - If the institution selected is not HQ, the super admin role should not be visibile in the role selection
                - If the institution selected is not HQ or district, the super admin and district roles should not be visibile in the role selection
                - Create auto generation password for user (edited) 
                - Password validation
                - Make sure all roles are defined in full in the role field (drop down)

            err.1 Table is not refreshing on submission
            
    - School Management
        * To be able to view the schools registered 
        - Schools Table
            - View Single School Page
            Business Rules
                add excel to export
        - School Form
            - Editing Schools
                - You may want to edit the school with the same form
            - Adding a new school
    - Student Management
        * To be able to view the students registered 
        - Students Table
            - View Single Student Page
            Business Rules
                add excel to export
        - Student Form
            - Editing Students
                - You may want to edit the school with the same form
            - Adding a new school
    - Student Management (Beneficiaries)
        * To be able to view the students registered 
        - Students Table
            - View Single Student Page
                err.1 Parent names are not showing on the beneficiaries table
                Business Rules
                    add excel to export

        - Student Form
            - Editing Students
                - You may want to edit the school with the same form
                * beneficiaries form is crashing on submission
            - Adding a new school
        - My School Management
            - Beneficiaries
    - CSE Management
        * To be able to view the students registered 
        - CSE Table
            - View CSE Club
                - CSE Attendance Table
                - CSE Attendance Form
                - CSE Enrollment Table
                - CSE Enrollment Form
                    Business Rules
                    - nCSE student enrollment, should be able create a student even if he/she does not exist on the system by a add button.

        - CSE Form
            - Editing CSE
                - You may want to edit the cse with the same form
            - Adding a new school

    Error Pages
        404
            - Create custom the 404 error page
        500
            - consider a contact the administrator link/form for any issues faced on the system. more like a helpdesk to resolve issues on the system by an administrator

All Forms
    Business Rules
        - preview form validation for all input
        - Adding mandatory fields by adding a asterix' to show that the field is manatory (edited) 


All tables
    Business Rules
        - Report to be printed in pdf/physical should have a logo and title

Roles and Authentication

Top Left Navigation
    * User must be able to view layers of navigation via bradcrumbs 
    * Create an in-application breadcrumbs to allow for easier user navigation 
    User Flow
        1. User selects a redirect button to a page
        2. Next page is appended to the previous page with the slash


Side Navigation
    Side Navigation scroll bar not visible on refresh (edited) 

