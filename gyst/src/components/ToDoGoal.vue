<template>
  <div>
  <b-card-group>
    <b-card title="School">
      <progress-circle :diameter="cp_diameter"
                      :completed-steps="cp_completedSteps"
                      :circle-color="cp_circleColor"
                      :start-color="cp_startColor"
                      :stop-color="cp_stopColor"
                      :circle-width="cp_circleWidth"
                      :animation-duration="cp_animationDuration"
                      :inner-color="cp_innerColor"
                      :inner-display="Percent"
                      :percent-color="cp_percentColor"
                      :total-steps="cp_totalSteps">
        <p>Total steps: {{ cp_totalSteps }}</p>
        <p>Completed steps: {{ cp_completedSteps }}</p>
      </progress-circle>
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This content is a little bit longer.
      </b-card-text>
    </b-card>

    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
      <b-card-text>
        This card has supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <template #footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>

    <b-card title="Title" img-src="https://placekitten.com/g/300/450" img-alt="Image" img-top>
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This card has even longer content than the first to show that equal height action.
      </b-card-text>
      <template #footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>
  </b-card-group>
</div>
        
</template>

<script>

</script>

<style scoped>

</style>