import { Phone, CheckCircle, TrendingUp, MessageSquare, Target, Users, AlertCircle } from 'lucide-react';
import Header from '@/components/dashboard/Header';
import StatCard from '@/components/dashboard/StatCard';
import DoughnutChart from '@/components/dashboard/DoughnutChart';
import BarChart from '@/components/dashboard/BarChart';
import LineChart from '@/components/dashboard/LineChart';
import FileUpload from '@/components/dashboard/FileUpload';
import { useCallData } from '@/hooks/useCallData';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  const { 
    fileName, 
    isLoading, 
    error, 
    loadFromCSV, 
    clearData, 
    analytics 
  } = useCallData();

  const {
    totalCalls,
    completedCalls,
    conversionRate,
    averageInteractions,
    callStatusDistribution,
    sentimentDistribution,
    interestDistribution,
    awarenessDistribution,
    schemeLevelDistribution,
    dailyVolume,
  } = analytics;

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <Header />

        {/* File Upload */}
        <FileUpload 
          onFileLoaded={loadFromCSV}
          currentFileName={fileName}
          onClear={clearData}
        />

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Processing data...</p>
          </div>
        )}

        {/* Key Metrics */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Calls"
              value={totalCalls}
              subtitle="All call attempts"
              icon={Phone}
              trend={{ value: 12.5, isPositive: true }}
              colorClass="text-primary"
            />
            <StatCard
              title="Completed Calls"
              value={completedCalls}
              subtitle="Successfully connected"
              icon={CheckCircle}
              trend={{ value: 8.3, isPositive: true }}
              colorClass="text-success"
            />
            <StatCard
              title="Conversion Rate"
              value={`${conversionRate}%`}
              subtitle="Interest shown"
              icon={TrendingUp}
              trend={{ value: 5.2, isPositive: true }}
              colorClass="text-accent"
            />
            <StatCard
              title="Avg Interactions"
              value={averageInteractions}
              subtitle="Per completed call"
              icon={MessageSquare}
              colorClass="text-warning"
            />
          </div>
        </section>

        {/* Charts Row 1 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Call Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChart
              title="Daily Call Volume Trend"
              labels={dailyVolume.map(([date]) => date)}
              data={dailyVolume.map(([, count]) => count)}
            />
            <BarChart
              title="Call Status Distribution"
              labels={Object.keys(callStatusDistribution)}
              data={Object.values(callStatusDistribution)}
            />
          </div>
        </section>

        {/* Charts Row 2 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Customer Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DoughnutChart
              title="Sentiment Analysis"
              data={sentimentDistribution}
              colors={['hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(0, 72%, 51%)']}
            />
            <DoughnutChart
              title="Interest in Loan"
              data={interestDistribution}
              colors={['hsl(168, 84%, 40%)', 'hsl(217, 33%, 40%)']}
            />
            <DoughnutChart
              title="Scheme Awareness"
              data={awarenessDistribution}
              colors={['hsl(199, 89%, 48%)', 'hsl(262, 83%, 58%)']}
            />
          </div>
        </section>

        {/* Charts Row 3 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Scheme Distribution</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChart
              title="User Scheme Level"
              labels={Object.keys(schemeLevelDistribution)}
              data={Object.values(schemeLevelDistribution)}
              color="hsl(262, 83%, 58%)"
            />
            <div className="chart-container animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Campaign Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Target Audience Reached</span>
                  </div>
                  <span className="mono text-primary font-semibold">{totalCalls}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-success" />
                    <span className="text-foreground">Qualified Leads</span>
                  </div>
                  <span className="mono text-success font-semibold">{completedCalls}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="text-foreground">Positive Sentiment Rate</span>
                  </div>
                  <span className="mono text-accent font-semibold">
                    {Object.values(sentimentDistribution).reduce((a, b) => a + b, 0) > 0 
                      ? ((sentimentDistribution['Positive'] || 0) / Object.values(sentimentDistribution).reduce((a, b) => a + b, 0) * 100).toFixed(1)
                      : '0'}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm py-8 border-t border-border/30">
          <p>PM-SVANidhi Voice Agent Dashboard • {fileName ? `Data from: ${fileName}` : 'Sample Data'}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
