export default {
  translations: {
		types: {
			all: 'Todos',
			incomes: 'Rendimentos',
			expenses: 'Despesas',
			investments: 'Investimentos'
		},
		categories: {
			all: 'Todos',
			total: 'Total',
			incomes: {
				salary: 'Salário',
				gifts: 'Presentes',
				sales: 'Vendas',
				rent: 'Renda',
			},
			expenses: {
				housing: 'Habitação',
				transportation: 'Transporte',
				food: 'Alimentação',
				health: 'Saúde',
				entertainment: 'Entretenimento',
				utilities: 'Utilidades',
				debt: 'Dívidas',
				education: 'Educação',
				travel: 'Viagens',
			},
			investments: {
				bonds: 'Obrigações',
				stocks: 'Ações',
				crypto: 'Criptomoedas',
				etf: 'ETFs',
			},
			other: 'Outros'
		},
    navbar: {
			main: {
				features: 'Funcionalidades',
				pricing: 'Preços',
				about: 'Sobre',
				login: 'Autenticar',
				register: 'Experimentar gratuitamente',
				register_mobile: 'Experimentar'
			},
			app: {
				dashboard: 'Dashboard',
				stats: 'Estatísticas',
				transactions: 'Transações',
				add: 'Criar transação',
				logout: 'Sair'
			}
    },
		footer: {
			disclaimer: 'Aviso legal - este website foi criado apenas para fins de demonstração, com funcionalidades limitadas. Não é um produto ou serviço totalmente funcional.',
			features: {
				title: 'Funcionalidades',
				list: ['Rastreamento de transações', 'Gestão de orçamento', 'Relatórios', 'Categorização de transações', 'Moedas correntes', 'Segurança de dados']
			},
			resources: {
				title: 'Recursos',
				list: ['Comunidade', 'Guias do utilizador', 'Blog', 'Perguntas frequentes', 'Centro de suporte']
			},
			learn: {
				title: 'Saiba mais',
				list: ['Sobre nós', 'Carreiras', 'Termos de serviço', 'Política de privacidade', 'Contacte-nos']
			},
			start: {
				title: 'Comece',
				list: ['Criar uma nova conta', 'Iniciar sessão']
			}
		},
		main: {
			intro: {
				title: 'Gerir as finanças <br>nunca foi tão fácil',
				title_mobile: 'Gerir as finanças nunca foi tão fácil',
				subtitle: 'A nossa aplicação foi concebida para o controlo das despesas e dos rendimentos. Simplifique a sua supervisão financeira e mantenha-se no caminho certo com facilidade.',
				join: 'Junte-se a +2M utilizadores',
				cta: 'Comece agora',
				users: {
					stats: '+2M',
					label: 'Utilizadores'
				},
				experience: {
					stats: '+4A',
					label: 'No mercado'
				}
			},
			features: {
				title: 'Funcionalidades',
				cards: {
					finance: 'Controlo financeiro',
					currency: 'Múltiplas moedas',
					data: 'Dados seguros'
				}
			},
			pricing: {
				title: 'Preços',
				plans: {
					starter: {
						title: 'Iniciante',
						subtitle: 'Comece com o rastreamento de transações essenciais',
						features: [
							'Inserção manual de transações',
							'Categorização básica de transações',
							'Capacidade de visualizar dados históricos',
							'Proteção básica por senha para login na conta'
						],
						cta: 'Experimente grátis'
					},
					pro: {
						title: 'Pro',
						subtitle: 'Desbloqueie recursos avançados para uma gestão financeira abrangente',
						features: [
							'Suporte para todas as moedas',
							'Gestão de orçamento',
							'Acompanhamento mensal de metas financeiras',
							'Autenticação de dois fatores para segurança avançada',
							'Suporte prioritário por e-mail com tempos de resposta mais rápidos'
						],
						cta: 'Comece por 12€/mês'
					},
					organization: {
						title: 'Organização',
						subtitle: 'Maximize a eficiência organizacional com recursos avançados',
						features: [
							'Relatórios e análises avançadas para insights mais profundos sobre padrões de gastos',
							'Ferramentas de previsão avançadas para prever tendências futuras de gastos',
							'Integração de login seguro SAML SSO para autenticação contínua',
							'API de nível empresarial com suporte dedicado para projetos de integração',
							'Suporte telefônico 24/7 para questões urgentes e solução de problemas',
							'Gerente de conta dedicado para suporte e assistência personalizados'
						],
						cta: 'Comece por 40€/mês'
					}
				},
				features: {
					title: 'Comparar recursos',
					plans: {
						starter: {
							title: 'Iniciante',
							price: 'Grátis',
							cta: 'Assinar'
						},
						pro: {
							title: 'Pro',
							price: '12€/mês',
							cta: 'Assinar'
						},
						organization: {
							title: 'Organização',
							price: '40€/mês',
							cta: 'Assinar'
						}
					},
					list: {
						tracking: {
							title: 'Rastreamento',
							features: [
								'Inserção manual de transações',
								'Categorização básica de transações',
								'Suporte a várias moedas',
								'Sumários mensais de notificações por e-mail',
								'Gestão de orçamento',
								'Integração com contas bancárias e cartões de crédito para sincronização de transações em tempo real',
								'Categorias de despesas e etiquetas personalizáveis para rastreamento personalizado',
								'Relatórios e análises avançadas para insights mais profundos sobre padrões de gastos'
							],
							custom: ['$/€/£']
						},
						management: {
							title: 'Gestão',
							features: [
								'Capacidade de visualizar dados históricos',
								'Acompanhamento mensal de metas financeiras',
								'Lembretes de despesas recorrentes e pagamentos agendados',
								'Ferramentas de previsão avançadas para prever tendências futuras de gastos',
							]
						},
						security: {
							title: 'Segurança',
							features: [
								'Proteção por senha para login na conta',
								'Monitoramento de atividades da conta e notificações',
								'Autenticação de dois fatores para segurança avançada',
								'Integração de login seguro SAML SSO para autenticação contínua',
							]
						},
						integration: {
							title: 'Integração',
							features: [
								'Exportação de dados em CSV',
								'Acesso à API para integrações personalizadas com outras plataformas',
								'API de nível empresarial com suporte dedicado para projetos de integração'
							]
						},
						support: {
							title: 'Suporte',
							features: [
								'Suporte por e-mail básico com tempos de resposta limitados',
								'Suporte por e-mail prioritário com tempos de resposta mais rápidos',
								'Suporte por chat ao vivo durante o horário comercial',
								'Suporte telefônico 24/7 para questões urgentes e solução de problemas',
								'Gerente de conta dedicado para suporte e assistência personalizados'
							]
						}
					}
				}
			},
			about: {
				title: 'Sobre nós',
				description: `Expns é um projeto de paixão com o objetivo de simplificar o rastreamento de transações para indivíduos e empresas. Esta jornada começou com uma ideia simples: criar uma ferramenta intuitiva e eficiente que capacita os usuários a controlarem suas finanças sem esforço. Desde sua criação, tem-se comprometido em oferecer uma experiência de usuário perfeita, aproveitando as tecnologias mais recentes para oferecer recursos que simplificam a gestão de despesas e fornecem insights valiosos sobre hábitos de gastos.<br><br>O foco está na simplicidade e inovação. Esforços contínuos são feitos para aprimorar a funcionalidade do aplicativo, acompanhando as necessidades em constante evolução dos usuários. A dedicação à excelência impulsiona o projeto a ultrapassar os limites do que é possível em software de gestão financeira.`,
				whyUs: 'Por que nós?',
				cards: {
					savings: {
						title: '+24% Poupança',
						subtitle: 'Supere na poupança'
					},
					time: {
						title: '3x Tempo economizado',
						subtitle: 'Organização mais eficiente'
					},
					spending: {
						title: '-37% Gastos excessivos',
						subtitle: 'Reduza os gastos excessivos'
					},
					categorization: {
						title: 'Categorização intuitiva',
						subtitle: 'Visão dos hábitos de gastos'
					},
					data: {
						title: 'Visualização clara dos dados',
						subtitle: 'Organizado para insights financeiros'
					}
				},
				clients: 'Os nossos clientes'
			}
		},
		auth: {
			email: 'Correio eletrónico',
			password: 'Senha',
			login: {
				remember: 'Guardar sessão',
				forgot: 'Senha esquecida?',
				cta: 'Entrar',
				alt: 'Não tem uma conta?',
				alt_opt: 'Criar uma',
				reqs: {
					warning: 'Por favor, preencha todos os campos.',
					failed: 'Erro no servidor, tente novamente mais tarde.',
					wrong: 'Dados incorretos.',
					succeeded: 'Utilizador autenticado com sucesso.'
				}
			},
			register: {
				terms: 'Confirmo que compreendo e aceito os termos de serviço e política de privacidade.',
				cta: 'Registar',
				alt: 'Já tem uma conta?',
				alt_opt: 'Entrar',
				reqs: {
					terms: 'Por favor, aceite os termos de serviço e política de privacidade.',
					min: 'A senha deve ter pelo menos 8 caracteres, 1 símbolo, 1 letra maíscula e 1 letra minúscula.',
					failed: 'Erro no servidor, tente novamente mais tarde.',
					duplicated: 'O email já está em uso.',
					succeeded: 'Utilizador registado com sucesso.'
				},
			},
			reset: {
				message_before: 'Será enviado um email com instruções para recuperação da conta.',
				message_after: 'Verifique o seu correio eletrónico e siga as instruções de recuperação de conta.',
				cta: 'Redefinir senha',
				alt_opt: 'Cancelar'
			}
		},
		app: {
			dashboard: {
				balance: {
					title: 'Saldo',
					description: 'Representa o saldo atual, calculado com rendimento mais investimentos menos despesas.'
				},
				incomes: {
					title: 'Rendimentos',
					description: 'Representa o total de dinheiro ganho.'
				},
				expenses: {
					title: 'Despesas',
					description: 'Representa o total de dinheiro gasto.'
				},
				investments: {
					title: 'Investimentos',
					description: 'Representa o total de dinheiro investido.'
				},
				transactions: {
					title: 'Transações',
					see_all: 'Ver tudo',
					no_transactions: 'Sem transações para mostrar.'
				},
				categories: {
					title: 'Categorias',
					type: {
						all: 'Todas',
						incomes: 'Rendimentos',
						expenses: 'Despesas',
						investments: 'Investimentos'
					}
				},
			},
			stats: {
				title: 'Transações',
				type: {
					all: 'Todos',
					incomes: 'Rendimentos',
					expenses: 'Despesas',
					investments: 'Investimentos'
				},
				time: {
					day: '1D',
					week: '1S',
					month: '1M',
					year: '1A',
					all: 'Tudo'
				}
			},
			transactions: {
				type: 'Tipo',
				category: 'Categoria',
				search: 'Pesquisar transacções por nome ...',
				sort: {
					placeholder: 'Ordenar por',
					sort_val: 'Valor',
					sort_val_asc: 'Ordenar por valor (ascendente)',
					sort_val_desc: 'Ordenar por valor (decrescente)',
					sort_date: 'Data',
					sort_date_asc: 'Ordenar por data (crescente)',
					sort_date_desc: 'Ordenar por data (decrescente)',
					sort_name: 'Nome',
					sort_name_asc: 'Ordenar por nome (crescente)',
					sort_name_desc: 'Ordenar por nome (decrescente)'
				},
				filter: {
					value: 'Valor da transação',
					date: 'Data da transação',
					min: 'Min',
					max: 'Max'
				},
				no_transactions: 'Sem transações para mostrar. Comece por criar uma nova transação.'
			},
			form: {
				name: 'Nome da transação',
				date: 'Data',
				amount: 'Valor',
				description: 'Descrição (opcional)',
				create: 'Criar',
				save: 'Guardar',
				notification: {
					create: 'Transação criada com sucesso.',
					update: 'Transação atualizada com sucesso.',
					delete: 'Transação eliminada com sucesso.'
				}
			}
		}
  }
}