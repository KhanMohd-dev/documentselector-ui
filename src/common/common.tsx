import { generateUniqueId } from "../utils/helper"

export const buttonNames = ['Personal Info', 'Role', 'Role Details', 'Compensation', 'Agreements', 'Additional info', 'Source', 'Equipment', 'Offer', 'Review']


export const jobTemplates = [
    {
        displayName: 'Heavy Equipment Operator',
        value: 'Heavy Equipment Operator'
    },
    {
        displayName: 'Heavy Equipment Service Technician',
        value: 'Heavy Equipment Service Technician'
    },
    {
        displayName: 'Equipment Operator',
        value: 'Equipment Operator'
    },
    {
        displayName: 'Track Foreman',
        value: 'Track Foreman'
    },
    {
        displayName: 'Track Laborer',
        value: 'Track Laborer'
    },
    {
        displayName: 'Track Machine Operator',
        value: 'Track Machine Operator'
    },
    {
        displayName: 'Asphalt Plant Foreman',
        value: 'Asphalt Plant Foreman'
    },
    {
        displayName: 'Concrete Paving Foreman',
        value: 'Concrete Paving Foreman'
    },
    {
        displayName: 'Construction Quality Control Technician',
        value: 'Construction Quality Control Technician'
    },
    {
        displayName: 'Grade Foreman',
        value: 'Grade Foreman'
    },
    {
        displayName: 'Grinding Operator',
        value: 'Grinding Operator'
    },
    {
        displayName: 'Heavy Equipment Mechanic',
        value: 'Heavy Equipment Mechanic'
    },
    {
        displayName: 'Loader Operator',
        value: 'Loader Operator'
    },
    {
        displayName: 'Off Road Truck Driver',
        value: 'Off Road Truck Driver'
    }
]

export const locations = [
    {
        displayName: 'New York, NY',
        value: 'New York, NY'
    },
    {
        displayName: 'Los Angeles, CA',
        value: 'Los Angeles, CA'
    },
    {
        displayName: 'San Francisco, CA',
        value: 'San Francisco, CA'
    },
    {
        displayName: 'Miami, FL',
        value: 'Miami, FL'
    },
    {
        displayName: 'Chicago, IL',
        value: 'Chicago, IL'
    },
    {
        displayName: 'Boston, MA',
        value: 'Boston, MA'
    },
    {
        displayName: 'Houston, TX',
        value: 'Houston, TX'
    },
    {
        displayName: 'Austin, TX',
        value: 'Austin, TX'
    },
]

export const subsidiaries = [
    {
        displayName: 'Wholly Owned',
        value: 'Wholly Owned',
    },
    {
        displayName: 'Partly Owned',
        value: 'Partly Owned',
    },
    {
        displayName: 'Jointly Owned',
        value: 'Jointly Owned',
    },
]

export const seniority = [
    {
        displayName: 'Entry-Level Position',
        value: 'Entry-Level Position',
    },
    {
        displayName: 'Individual Contributor',
        value: 'Individual Contributor',
    },
    {
        displayName: 'Manager',
        value: 'Manager',
    },
    {
        displayName: 'Office Staff',
        value: 'Office Staff',
    },
    {
        displayName: 'Leadership / Management',
        value: 'Leadership / Management',
    },
]

export const accordionInfo = [
    {
        id: 'panel1',
        displayName: 'Drug Policies',
        options: [
            'Company Drug Policy',
        ]
    },
    {
        id: 'panel2',
        displayName: 'Employee Handbooks',
        options: [
            'Alabama - Employee Handbook',
            'California - Employee Handbook',
            'Colorado - Employee Handbook',
            'Florida - Employee Handbook',
            'Illinois - Employee Handbook',
            'Kansas - Employee Handbook',
            'New York - Employee Handbook',
            'Utah - Employee Handbook',
        ]
    },
    {
        id: 'panel3',
        displayName: 'Equipment Selection',
        options: [
            'Company Drug Policy',
        ]
    },
    {
        id: 'panel4',
        displayName: 'Non-Compete Agreements',
        options: [
            'Florida - Non-Compete Agreements',
            'Illinois - Non-Compete Agreements',
            'Kansas - Non-Compete Agreements',
        ]
    },
    {
        id: 'panel5',
        displayName: 'Payroll Handbook',
        options: [
            'New York - Payroll Handbook',
            'Utah - Payroll Handbook',
        ]
    },
    {
        id: 'panel6',
        displayName: 'PTO Policy',
        options: [
            'Company Drug Policy',

        ]
    },
    {
        id: 'panel7',
        displayName: 'Safety Manuals',
        options: [
            'Alabama - Safety Manuals',
            'California - Safety Manuals',
        ]
    },
    {
        id: 'panel8',
        displayName: 'Sexual Harassment',
        options: [
            'Sexual Harassment Training Manual',
        ]
    },
]

export const chipColor = {
    "job templates": {
        color: 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300',
        badge: 'text-green-400 bg-transparent rounded-sm hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300'
    },
    "locations": {
        color: 'text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300',
        badge: 'text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300'
    },
    "seniority": {
        color: 'text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300',
        badge: 'text-indigo-400 bg-transparent rounded-sm hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300'
    },
    "subsidiary": {
        color: 'text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300',
        badge: 'text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300'
    }
}

export const headings = {
    "agreements": {
        value: "Select Agreements, Notices and Other Documents"
    },
    "compensation": {
        value: "Compensation"
    },
    "personal info": {
        value: "Personal Information"
    },
    "role": {
        value: "Role"
    },
    "role details": {
        value: "Role Details"
    },
    "additional info": {
        value: "Additional Information"
    },
    "source": {
        value: "Source"
    },
    "equipment": {
        value: "Equipment"
    },
    "offer": {
        value: "Offer"
    },
    "review": {
        value: "Review"
    },
}

export const selectValues = [
    {
        displayName: "Teamsters 105",
        value: "Teamsters 105"
    },
    {
        displayName: "Steel Workers 105",
        value: "Steel Workers 105"
    },
    {
        displayName: "Paving Contract Union 54",
        value: "Paving Contract Union 54"
    },
]

export const addCompensationDropdown = [
    {
        id: generateUniqueId(),
        displayName: "Signing Bonus",
        value: "Signing Bonus",
        type: "default"
    },
    {
        id: generateUniqueId(),
        displayName: "Relocation Bonus",
        value: "Relocation Bonus",
        type: "default"
    },
    {
        id: generateUniqueId(),
        displayName: "Discretionary Year-End Bonus",
        value: "Discretionary Year-End Bonus",
        type: "default"
    },
    {
        id: generateUniqueId(),
        displayName: "Discretionary Peformance Bonus",
        value: "Discretionary Peformance Bonus",
        type: "default"
    },
    {
        id: generateUniqueId(),
        displayName: "Vehicle Allowance",
        value: "Vehicle Allowance",
        type: "default"
    },
    {
        id: generateUniqueId(),
        displayName: "Healthcare Contribution",
        value: "Healthcare Contribution",
        type: "default"
    },
    {
        id: generateUniqueId(),
        displayName: "Phone Stipend",
        value: "Phone Stipend",
        type: "default"
    },
    {
        id: generateUniqueId(),
        displayName: "401(k)",
        value: "401k",
        type: "default"
    }
]

export const PERIOD_DROPDOWN = ["Days", "Month(s)", "Year(s)"]

export const FREQUENCY_DROPDOWN = ["Once", "Monthly", "Yearly", "Quarterly"]

export const WHEN_DROPDOWN = ["At the end of each period", "As part of their first pay run", "Number of days after they start work"]

export const DAYS_DROPDOWN = ["30", "60", "90", "120"]
