import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView
} from 'react-native';
import { DollarSign, TrendingUp, Calendar, ArrowUp, ArrowDown, CreditCard, Wallet } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Card from '@/components/Card';
import { useProfessionalStore } from '@/store/professional-store';
import { formatCurrency } from '@/utils/format';
import { LinearGradient } from 'expo-linear-gradient';

type Period = 'week' | 'month' | 'year';

interface Transaction {
  id: string;
  date: string;
  clientName: string;
  service: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export default function EarningsScreen() {
  const [activePeriod, setActivePeriod] = useState<Period>('month');
  
  // Mock earnings data
  const earningsData = {
    week: {
      total: 850,
      average: 121.43,
      change: 12.5,
      transactions: 12,
      chart: [120, 180, 150, 200, 100, 0, 100]
    },
    month: {
      total: 3200,
      average: 106.67,
      change: 8.2,
      transactions: 45,
      chart: [800, 700, 900, 800]
    },
    year: {
      total: 38500,
      average: 104.08,
      change: 15.3,
      transactions: 370,
      chart: [2800, 3200, 3500, 3000, 3200, 3800, 3200, 3500, 3200, 3000, 3100, 3000]
    }
  };
  
  // Mock transactions
  const transactions: Transaction[] = [
    {
      id: 'trans1',
      date: 'Today, 2:30 PM',
      clientName: 'Emma Johnson',
      service: 'Bridal Makeup',
      amount: 250,
      status: 'completed'
    },
    {
      id: 'trans2',
      date: 'Yesterday, 11:15 AM',
      clientName: 'Sophia Williams',
      service: 'Special Event Makeup',
      amount: 120,
      status: 'completed'
    },
    {
      id: 'trans3',
      date: 'Jun 10, 3:45 PM',
      clientName: 'Ava Wilson',
      service: 'Special Event Makeup',
      amount: 120,
      status: 'completed'
    },
    {
      id: 'trans4',
      date: 'Jun 8, 1:00 PM',
      clientName: 'Olivia Davis',
      service: 'Bridal Makeup',
      amount: 250,
      status: 'cancelled'
    },
    {
      id: 'trans5',
      date: 'Jun 5, 11:30 AM',
      clientName: 'Mia Thompson',
      service: 'Bridal Makeup',
      amount: 250,
      status: 'completed'
    }
  ];
  
  const currentData = earningsData[activePeriod];
  
  // Simple bar chart component
  const renderChart = () => {
    const maxValue = Math.max(...currentData.chart);
    
    return (
      <View style={styles.chartContainer}>
        {currentData.chart.map((value, index) => (
          <View key={index} style={styles.barContainer}>
            <View 
              style={[
                styles.bar, 
                { 
                  height: (value / maxValue) * 150,
                  backgroundColor: index % 2 === 0 ? Colors.primary : Colors.secondary
                }
              ]} 
            />
            <Text style={styles.barLabel}>
              {activePeriod === 'week' 
                ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]
                : activePeriod === 'month'
                ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'][index]
                : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]
              }
            </Text>
          </View>
        ))}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={[Colors.secondary, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.earningsHeader}
        >
          <Text style={styles.earningsLabel}>Total Earnings</Text>
          <Text style={styles.earningsValue}>{formatCurrency(currentData.total)}</Text>
          <Text style={styles.earningsPeriod}>
            {activePeriod === 'week' 
              ? 'This Week' 
              : activePeriod === 'month'
              ? 'This Month'
              : 'This Year'}
          </Text>
          
          <View style={styles.periodSelector}>
            <TouchableOpacity
              style={[styles.periodButton, activePeriod === 'week' && styles.activePeriod]}
              onPress={() => setActivePeriod('week')}
            >
              <Text style={[styles.periodText, activePeriod === 'week' && styles.activePeriodText]}>
                Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, activePeriod === 'month' && styles.activePeriod]}
              onPress={() => setActivePeriod('month')}
            >
              <Text style={[styles.periodText, activePeriod === 'month' && styles.activePeriodText]}>
                Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, activePeriod === 'year' && styles.activePeriod]}
              onPress={() => setActivePeriod('year')}
            >
              <Text style={[styles.periodText, activePeriod === 'year' && styles.activePeriodText]}>
                Year
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: `${Colors.primary}15` }]}>
              <DollarSign size={20} color={Colors.primary} />
            </View>
            <Text style={styles.statValue}>{formatCurrency(currentData.average)}</Text>
            <Text style={styles.statLabel}>Average</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: currentData.change >= 0 ? '#4CAF5015' : '#F4433615' }]}>
              {currentData.change >= 0 
                ? <ArrowUp size={20} color="#4CAF50" />
                : <ArrowDown size={20} color="#F44336" />
              }
            </View>
            <Text style={[
              styles.statValue, 
              { color: currentData.change >= 0 ? '#4CAF50' : '#F44336' }
            ]}>
              {currentData.change}%
            </Text>
            <Text style={styles.statLabel}>Growth</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#2196F315' }]}>
              <Calendar size={20} color="#2196F3" />
            </View>
            <Text style={styles.statValue}>{currentData.transactions}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </Card>
        </View>
        
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Earnings Overview</Text>
          {renderChart()}
        </Card>
        
        <View style={styles.paymentMethodsContainer}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.paymentMethods}>
            <Card style={styles.paymentMethod}>
              <View style={styles.paymentMethodIcon}>
                <CreditCard size={24} color={Colors.primary} />
              </View>
              <Text style={styles.paymentMethodTitle}>Credit Card</Text>
              <Text style={styles.paymentMethodValue}>85%</Text>
            </Card>
            
            <Card style={styles.paymentMethod}>
              <View style={styles.paymentMethodIcon}>
                <Wallet size={24} color="#4CAF50" />
              </View>
              <Text style={styles.paymentMethodTitle}>Cash</Text>
              <Text style={styles.paymentMethodValue}>15%</Text>
            </Card>
          </View>
        </View>
        
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
          {transactions.map((transaction) => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionHeader}>
                <View>
                  <Text style={styles.transactionClient}>{transaction.clientName}</Text>
                  <Text style={styles.transactionService}>{transaction.service}</Text>
                </View>
                <Text style={styles.transactionAmount}>{formatCurrency(transaction.amount)}</Text>
              </View>
              
              <View style={styles.transactionFooter}>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
                <View style={[
                  styles.statusBadge, 
                  { 
                    backgroundColor: 
                      transaction.status === 'completed' ? '#4CAF5015' : 
                      transaction.status === 'pending' ? '#FF980015' :
                      '#F4433615'
                  }
                ]}>
                  <Text style={[
                    styles.statusText, 
                    { 
                      color: 
                        transaction.status === 'completed' ? '#4CAF50' : 
                        transaction.status === 'pending' ? '#FF9800' :
                        '#F44336'
                    }
                  ]}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xl,
  },
  earningsHeader: {
    paddingVertical: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.l,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Layout.spacing.xs,
  },
  earningsValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  earningsPeriod: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: Layout.spacing.xs,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Layout.borderRadius.pill,
    padding: 4,
    marginTop: Layout.spacing.l,
  },
  periodButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.pill,
  },
  activePeriod: {
    backgroundColor: '#fff',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  activePeriodText: {
    color: Colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.l,
  },
  statCard: {
    width: '31%',
    alignItems: 'center',
    padding: Layout.spacing.s,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  chartCard: {
    marginHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.l,
    padding: Layout.spacing.m,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.m,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 180,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    marginBottom: Layout.spacing.xs,
  },
  barLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  paymentMethodsContainer: {
    marginHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.l,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.m,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    width: '48%',
    alignItems: 'center',
    padding: Layout.spacing.m,
  },
  paymentMethodIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  paymentMethodTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  paymentMethodValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  transactionsContainer: {
    marginHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.l,
  },
  transactionCard: {
    marginBottom: Layout.spacing.m,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.s,
  },
  transactionClient: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  transactionService: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xxs,
    borderRadius: Layout.borderRadius.small,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
});