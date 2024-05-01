export default {
  translations: {
		types: {
			all: 'All',
			incomes: 'Incomes',
			expenses: 'Expenses',
			investments: 'Investments'
		},
		categories: {
			all: 'All',
			total: 'Total',
			incomes: {
				salary: 'Salary',
				gifts: 'Gifts',
				sales: 'Sales',
				rent: 'Rent'
			},
			expenses: {
				housing: 'Housing',
				transportation: 'Transportation',
				food: 'Food',
				health: 'Health',
				entertainment: 'Entertainment',
				utilities: 'Utilities',
				debt: 'Debt',
				education: 'Education',
				travel: 'Travel'
			},
			investments: {
				bonds: 'Bonds',
				stocks: 'Stocks',
				crypto: 'Crypto',
				etf: 'ETF'
			},
			other: 'Other'
		},
    navbar: {
      main: {
				features: 'Features',
				pricing: 'Pricing',
				about: 'About',
				login: 'Log in',
				register: 'Try it for free',
				register_mobile: 'Register'
			},
			app: {
				dashboard: 'Dashboard',
				stats: 'Stats',
				transactions: 'Transactions',
				add: 'Add transaction',
				logout: 'Logout'
			}
    },
		footer: {
			disclaimer: 'Disclaimer - this website was created for demonstration purposes only, showcasing limited functionalities. It is not a fully functional product or service.',
			features: {
				title: 'Features',
				list: ['Transactions tracking', 'Budget management', 'Reporting', 'Transactions categorization', 'Currencies', 'Data security']
			},
			resources: {
				title: 'Resources',
				list: ['Community', 'User guides ', 'Blog', 'FAQs', 'Support center']
			},
			learn: {
				title: 'Learn more',
				list: ['About us', 'Careers', 'Terms of service', 'Privacy policy', 'Contact us']
			},
			start: {
				title: 'Get started',
				list: ['Create a new account', 'Log in']
			}
		},
		main: {
			intro: {
				title: 'Managing finances has <br>never been easier',
				title_mobile: 'Managing finances has never been easier',
				subtitle: 'Our app is crafted for seamless tracking of expenses and incomes. Simplify your financial oversight and stay on track with ease.',
				join: 'Join +2M satisfied users',
				cta: 'Get started',
				users: {
					stats: '+2M',
					label: 'Satisfied users'
				},
				experience: {
					stats: '+4',
					label: 'Years on the market'
				}
			},
			features: {
				title: 'Features',
				cards: {
					finance: 'Finance oversight',
					currency: 'Multiple currencies',
					data: 'Secured data'
				}
			},
			pricing: {
				title: 'Pricing',
				plans: {
					starter: {
						title: 'Starter',
						subtitle: 'Get started with essential transactions tracking',
						features: [
							'Manual input of transactions',
							'Basic categorization of transactions',
							'Ability to view historical data',
							'Basic password protection for account login'
						],
						cta: 'Try it for free'
					},
					pro: {
						title: 'Pro',
						subtitle: 'Unlock advanced features for comprehensive financial management',
						features: [
							'Every currency supported',
							'Budget management',
							'Monthly financial goal tracking',
							'Two-factor authentication for enhanced security',
							'Priority email support with faster response times'
						],
						cta: 'Get started - $12/mo'
					},
					organization: {
						title: 'Organization',
						subtitle: 'Maximize organizational efficiency with advanced  features',
						features: [
							'Advanced reporting and analytics for deeper insights into spending patterns',
							'Advanced forecasting tools for predicting future spending trends',
							'Secure SAML SSO login integration for seamless authentication',
							'Enterprise-grade API with dedicated support for integration projects',
							'24/7 phone support for urgent issues and troubleshooting',
							'Dedicated account manager for personalized support and assistance'
						],
						cta: 'Get started - $40/mo'
					}
				},
				features: {
					title: 'Compare features',
					plans: {
						starter: {
							title: 'Starter',
							price: 'Free',
							cta: 'Select plan'
						},
						pro: {
							title: 'Pro',
							price: '$12/mo',
							cta: 'Select plan'
						},
						organization: {
							title: 'Organization',
							price: '$40/mo',
							cta: 'Select plan'
						}
					},
					list: {
						tracking: {
							title: 'Tracking',
							features: [
								'Manual input of transactions',
								'Basic categorization of transactions',
								'Multi-currency support',
								'Monthly notification summaries via email',
								'Budget management',
								'Integration with bank accounts and credit cards for real-time transaction syncing',
								'Customizable expense categories and tags for tailored tracking',
								'Advanced reporting and analytics for deeper insights into spending patterns'
							],
							custom: ['$/€/£']
						},
						management: {
							title: 'Management',
							features: [
								'Ability to view historical data',
								'Monthly financial goal tracking',
								'Recurring expense reminders and scheduled payments',
								'Advanced forecasting tools for predicting future spending trends',
							]
						},
						security: {
							title: 'Security',
							features: [
								'Password protection for account login',
								'Account activity monitoring and notifications',
								'Two-factor authentication for enhanced security',
								'Secure SAML SSO login integration for seamless authentication',
							]
						},
						integration: {
							title: 'Integration',
							features: [
								'CSV export of data',
								'API access for custom integrations with other platforms',
								'Enterprise-grade API with dedicated support for integration projects'
							]
						},
						support: {
							title: 'Support',
							features: [
								'Basic email support with limited response times',
								'Priority email support with faster response times',
								'Live chat support during business hours',
								'24/7 phone support for urgent issues and troubleshooting',
								'Dedicated account manager for personalized support and assistance'
							]
						}
					}
				}
			},
			about: {
				title: 'About us',
				description: `Expns is a passion project with the aim of simplifying transactions tracking for individuals and businesses alike. This journey began with a simple idea: to create an intuitive and efficient tool that empowers users to take control of their finances effortlessly. Since its inception, it has been committed to delivering a seamless user experience, leveraging the latest technologies to offer features that streamline expense management and provide valuable insights into spending habits.<br><br>The focus is on simplicity and innovation. Continuous efforts are made to enhance the app's functionality, keeping pace with the evolving needs of users. Dedication to excellence drives the project to push the boundaries of what's possible in financial management software.`,
				whyUs: 'Why us?',
				cards: {
					savings: {
						title: '+24% Savings',
						subtitle: 'Outperforms non-trackers in saving'
					},
					time: {
						title: '3x Time saved',
						subtitle: 'Efficiency upgrade over spreadsheets'
					},
					spending: {
						title: '-37% Overspending',
						subtitle: 'Slash overspending with budgeting'
					},
					categorization: {
						title: 'Intuitive categorization',
						subtitle: 'Clear insights into spending habits'
					},
					data: {
						title: 'Clear data view',
						subtitle: 'Organized for better financial insights'
					}
				},
				clients: 'Our clients'
			}
		},
		auth: {
			email: 'Email',
			password: 'Password',
			login: {
				remember: 'Remember me',
				forgot: 'Forgot password?',
				cta: 'Log in',
				alt: 'Don\'t have an account?',
				alt_opt: 'Create one',
				reqs: {
					warning: 'Please fill in all fields.',
					failed: 'Server error, please try again later.',
					wrong: 'Invalid email or password',
					succeeded: 'Authentication succeeded.'
				}
			},
			register: {
				terms: 'Confirm that you understand and accept the terms of service and privacy policy.',
				cta: 'Register',
				alt: 'Already have an account?',
				alt_opt: 'Log in',
				reqs: {
					title: 'Password must contain at least 8 characters, a number, an uppercase letter, a lowercase letter, and a symbol.',
					warning: 'Please fill in all fields.',
					password_warning: 'The password must include at least:',
					number: 'a number.',
					uppercase: 'an uppercase letter.',
					lowercase: 'a lowercase letter.',
					symbol: 'a symbol.',
					length: 'eight characters.',
					failed: 'Server error, please try again later.',
					duplicated: 'Email already in use.',
					succeeded: 'Account created successfully.'
				},
			},
			reset: {
				message_before: 'An email will be sent for account recovery instructions.',
				message_after: 'Please check your email for account recovery instructions.',
				cta: 'Reset password',
				alt_opt: 'Cancel'
			}
		},
		app: {
			dashboard: {
				balance: {
					title: 'Balance',
					description: 'Represents the current balance, calculated as income plus investments minus expenses.'
				},
				incomes: {
					title: 'Incomes',
					description: 'Represents the total amount of money received.'
				},
				expenses: {
					title: 'Expenses',
					description: 'Represents the total amount of money spent.'
				},
				investments: {
					title: 'Investments',
					description: 'Represents the total amount of money invested.'
				},
				transactions: {
					title: 'Transactions',
					see_all: 'See all',
				},
				categories: {
					title: 'Category overview',
					type: {
						all: 'All',
						incomes: 'Incomes',
						expenses: 'Expenses',
						investments: 'Investments'
					}
				}
			},
			stats: {
				title: 'Transactions',
				type: {
					all: 'All',
					incomes: 'Incomes',
					expenses: 'Expenses',
					investments: 'Investments'
				},
				time: {
					day: '1D',
					week: '1W',
					month: '1M',
					year: '1Y',
					custom: 'Custom'
				}
			},
			transactions: {
				type: 'Type',
				category: 'Category',
				search: 'Search transactions by name ...',
				sort: {
					placeholder: 'Sort by',
					sort_val: 'Value',
					sort_val_asc: 'Sort by value (ascending)',
					sort_val_desc: 'Sort by value (descending)',
					sort_date: 'Date',
					sort_date_asc: 'Sort by date (ascending)',
					sort_date_desc: 'Sort by date (descending)',
					sort_name: 'Name',
					sort_name_asc: 'Sort by name (ascending)',
					sort_name_desc: 'Sort by name (descending)'
				},
				filter: {
					value: 'Value of transaction',
					date: 'Date of transaction',
					min: 'Min',
					max: 'Max'
				}			
			},
			form: {
				name: 'New transaction name',
				date: 'Date',
				amount: 'Amount',
				description: 'Description (optional)',
				create: 'Create',
				save: 'Save changes'
			}
		}
  }
}